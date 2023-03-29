import GlobalDB from "../database/Global";
import { Config } from "../../utils";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces";
import { Player, ManagerPlayer, Response } from "./Game";
class HangManPlayer extends Player {
  constructor({ id, name, threadID, wrongs, corrects, word }) {
    super(id, threadID);
    this.name = name;
    this.wrongs = wrongs || [];
    this.corrects = corrects || [];
    this.word = word;
  }
}

class Hangman {
  constructor() {
    this.manager = new ManagerPlayer();
    this.tools = null;
  }

  setTools(tools) {
    if (!this.tools) this.tools = tools;
  }

  async initGame(id, name, threadID, tools) {
    this.setTools(tools);
    if (this.manager.hasPlayer(id, threadID))
      return new Response({
        type: "has_player",
        message: "👉 Bạn đang trong trò chơi",
        data: null,
      });
    const word = await this.getRandWord();
    if (!word)
      return new Response({
        type: "error",
        message: "❌ Không có từ nào trong database",
        data: null,
      });
    const player = new HangManPlayer({ id, name, threadID, word });
    const res = this.manager.addPlayer(player);
    if (!res)
      return new Response({
        type: "error",
        message: "🥹 Không thể tạo player",
        data: null,
      });
    return new Response({
      type: "success",
      message: this.getStartMessage(player),
      data: player,
    });
  }

  /**
   * @param {CommandSpace.OnReplyParams}
   */
  async startGame({ event }) {
    let { senderID, threadID, body } = event;
    if (!body)
      return new Response({
        type: "error",
        message: "❌ Bạn cần nhập nội dung tin nhắn!",
        data: null,
      });
    body = body.toLowerCase();
    const player = this.manager.getPlayer(senderID, threadID);
    if (!player)
      return new Response({
        type: "error",
        message: "🥹 Không tìm thấy player",
        data: null,
      });

    if (body.length === 1) {
      if (this.hasGuess(player, body))
        return new Response({
          type: "error",
          message: "🥺 Bạn đã đoán chữ cái này rồi",
          data: null,
        });
      if (this.isCorrect(player, body)) {
        player.corrects.push(body);
        if (this.isWin(player)) {
          this.manager.removePlayer(senderID, threadID);
          return new Response({
            type: "end",
            message:
              "🎉 Chúc mừng bạn đã thắng!\n📃 Từ của bạn là: " + player.word,
            data: null,
          });
        }
        let text = "Bạn đã đoán trúng chữ cái: " + body + "\n";
        text +=
          "👉 Từ của bạn là: " +
          this.getHiddenWord(player.word, player.corrects).text +
          "\n";
        text += "🚨 Reply tin nhắn này để đoán tiếp \n";
        return new Response({ type: "success", message: text, data: player });
      }
    }
    if (this.isWord(player, body)) {
      this.manager.removePlayer(senderID, threadID);
      return new Response({
        type: "end",
        message: "🎉 Chúc mừng bạn đã thắng!\n📃 Từ của bạn là: " + player.word,
        data: null,
      });
    }
    player.wrongs.push(body);
    if (this.isLose(player)) {
      this.manager.removePlayer(senderID, threadID);
      return new Response({
        type: "end",
        message: "👎 Bạn đã thua!\n📃 Từ của bạn là: " + player.word,
        data: null,
      });
    }
    let text = "❌ Bạn đã đoán sai từ: " + body + "\n";
    text += "👉 Bạn còn " + (5 - player.wrongs.length) + " lượt đoán \n";
    text +=
      "👉 Từ của bạn là: " +
      this.getHiddenWord(player.word, player.corrects).text +
      "\n";
    text += Config.line + "\n";
    text += "🚨 Reply tin nhắn này để đoán tiếp \n";
    return new Response({ type: "success", message: text, data: player });
  }

  isWord(player, word) {
    return word == player.word;
  }

  hasGuess(player, char) {
    return player.corrects.includes(char) || player.wrongs.includes(char);
  }

  getStartMessage(player) {
    let text = "🎮 Chào mừng " + player.name + " đến với trò chơi hangman \n";
    text += Config.line + "\n";
    text += "🕹️ Bạn cần phải đoán từ tiếng anh bot đưa ra\n";
    text += "🔢 Bạn có 5 lượt đoán sai \n";
    text += "🚨 Reply tin nhắn này để bắt đầu chơi \n";
    text += Config.line + "\n";
    text +=
      "👉 Từ của bạn là: " +
      this.getHiddenWord(player.word, player.corrects).text +
      "\n";
    return text;
  }

  isCorrect(player, char) {
    return player.word.includes(char);
  }

  isWin(player) {
    return this.getHiddenWord(player.word, player.corrects).ms == player.word;
  }

  isLose(player) {
    return player.wrongs.length >= 5;
  }

  getHiddenWord(word, corrects) {
    let text = "";
    let ms = "";
    for (let char of word) {
      if (corrects.includes(char)) {
        text += char + " ";
        ms += char;
      } else {
        text += "_ ";
      }
    }
    return {
      text,
      ms,
    };
  }

  async getRandWord() {
    const words = await Hangman.getAllWords();
    if (!words.length) return null;
    const rand = this.getRand(0, words.length - 1);
    return words[rand];
  }

  static async getAllWords() {
    const data = await GlobalDB.findOne({ name: "hangman" });
    if (!data) return [];
    if (!data.words) return [];
    return data.words;
  }

  static async addWords(words = []) {
    const data = await GlobalDB.findOne({ name: "hangman" });
    if (!data) {
      await GlobalDB.insert({ name: "hangman", words });
      return words;
    }
    let newWords = [];
    for (let w of words) {
      if (!data.words.includes(w)) newWords.push(w);
    }
    await GlobalDB.update(
      { name: "hangman" },
      { $set: { words: [...data.words, ...newWords] } }
    );
    return newWords;
  }
  getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default Hangman;
