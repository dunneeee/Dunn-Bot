import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces";
import { Config, Game as GameUtil } from "../../utils";
import Hungman from "../module/Hungman";
import UserDB from "../database/User";
class Game extends Command {
  constructor() {
    super({
      name: "game",
      author: "LT.Dũng",
      description: "Mini game vui vẻ",
      usage: "game <tên game>",
    });
    this.threads = [
      {
        id: "",
        game: {},
        userPlaying: [
          {
            id: "",
            gameName: "",
          },
        ],
      },
    ];
    this.timeout = 60;
  }

  /**
   *
   * @param {CommandSpace.OnCallParams} param0
   */
  async onCall({ event, args }) {
    const { threadID, senderID } = event;
    const { controller, message, bot } = this.tools;
    if (args.length === 0) return this.getListGameText();
    const gameName = args[0].toLowerCase();
    if (this.isUserPlaying(threadID, senderID))
      return "❌ Bạn đang chơi game khác!";
    if (gameName == "hungman") return await this.onHungmanGame({ event, args });

    return "🥺 Không tìm thấy game này!";
  }

  clearTimeoutGame(callback) {
    return setTimeout(() => callback(), this.timeout * 1000);
  }

  /**
   *
   * @param {CommandSpace.OnReplyParams} param0
   */
  async onReply({ event }) {
    const { threadID, senderID } = event;
    const { controller, message } = this.tools;
    if (!this.isUserPlaying(threadID, senderID)) {
      this.removeReply(event.messageReply.messageID);
      return "❌ Bạn chưa bắt đầu game! in Game";
    }
    const thread = this.getThread(threadID);
    const userPlaying = this.getUserPlaying(threadID, senderID);
    if (userPlaying.gameName == "hungman") {
      const game = thread.game[userPlaying.gameName];
      const gameRes = await game.startGame(event);
      if (gameRes.state == "error") return gameRes.message;
      this.removeReply(event.messageReply.messageID);
      if (gameRes.state == "stop") {
        this.deleteUserPlaying(threadID, senderID);
        if (gameRes.isWin === true) {
          await UserDB.updateOne({ id: senderID }, { $inc: { money: 1000 } });
          gameRes.message += "\n 🎉 Bạn đã thắng và nhận được 1000coins!";
        } else {
          await UserDB.updateOne({ id: senderID }, { $inc: { money: -1000 } });
          gameRes.message += "\n ☹️ Bạn đã thua và bị trừ 1000coins!";
        }
        return gameRes.message;
      }
      const info = await message.reply(
        gameRes.message,
        threadID,
        event.messageID
      );
      this.addReply(info.messageID, senderID);
      this.clearTimeoutGame(() => {
        this.removeReply(info.messageID);
      });
    }
  }

  /**
   *
   * @param {CommandSpace.OnCallParams} param0
   * @returns
   */
  async onHungmanGame({ args, event }) {
    const { controller, message, bot } = this.tools;
    const { threadID, senderID } = event;
    const words = args.splice(1);
    const gameName = "hungman";
    if (words.length && senderID == bot.ownerID) {
      const ws = await Hungman.addWords(words.map((w) => w.toLowerCase()));
      if (ws.length > 0)
        return `✅ Đã thêm ${ws.join(", ")} từ vào cơ sở dữ liệu!`;
      return "❌ Không có từ nào được thêm vào cơ sở dữ liệu!";
    }
    let thread = this.getThread(threadID);
    if (!thread) {
      let n = this.createNewThread(threadID);
      thread = n;
      this.threads.push(n);
    }
    if (!thread.game[gameName]) {
      thread.game[gameName] = new Hungman(this.tools, threadID);
    }
    const game = thread.game[gameName];
    const gameRes = await game.initGame(senderID);
    if (!gameRes.status) return gameRes.message;
    const info = await message.reply(
      gameRes.message,
      event.threadID,
      event.messageID
    );
    this.addUserPlaying(threadID, senderID, gameName);
    controller.queueReply.add(info.messageID, {
      commandName: this.name,
      author: senderID,
    });
    this.clearTimeoutGame(() => {
      this.removeReply(info.messageID);
    });
    setTimeout(() => {
      this.deleteUserPlaying(threadID, senderID);
    }, 5 * 60 * 1000);
    return;
  }

  addGameForThread(threadID, gameName, game) {
    const thread = this.getThread(threadID);
    if (!thread) {
      let n = this.createNewThread(threadID);
      thread = n;
      this.threads.push(n);
    }
    thread.game[gameName] = game;
  }

  createNewThread(threadID) {
    return {
      id: threadID,
      game: {},
      userPlaying: [],
    };
  }

  removeReply(messageID) {
    this.tools.controller.queueReply.delete(messageID);
  }

  addReply(messageID, senderID) {
    this.tools.controller.queueReply.add(messageID, {
      commandName: this.name,
      author: senderID,
    });
  }

  hasThread(threadID) {
    return !!this.threads.find((thread) => thread.id === threadID);
  }

  getThread(threadID) {
    return this.threads.find((thread) => thread.id === threadID);
  }

  deleteThread(threadID) {
    this.threads = this.threads.filter((thread) => thread.id !== threadID);
  }

  isUserPlaying(threadID, userID) {
    const thread = this.getThread(threadID);
    if (!thread) return false;
    return !!thread.userPlaying.find((u) => u.id == userID);
  }

  deleteUserPlaying(threadID, userID) {
    const thread = this.getThread(threadID);
    if (!thread) return false;
    thread.userPlaying = thread.userPlaying.filter((user) => user.id != userID);
  }

  addUserPlaying(threadID, userID, gameName) {
    const thread = this.getThread(threadID);
    if (!thread) return false;
    thread.userPlaying.push({
      id: userID,
      gameName,
    });
    return true;
  }

  getUserPlaying(threadID, userID) {
    const thread = this.getThread(threadID);
    if (!thread) return null;
    return thread.userPlaying.find((user) => user.id === userID);
  }

  hasGame(threadID, gameName) {
    const thread = this.getThread(threadID);
    if (!thread) return false;
    return thread.game[gameName];
  }

  getListGameText() {
    let text = "🎮 Danh sách game:\n";
    text += Config.line + "\n";
    text += "🎮 hungman: Chơi đoán từ\n";
    return text;
  }
}

export default new Game();
