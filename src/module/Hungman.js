import { Config, Game } from "../../utils";
import { Fca } from "fca-dunnn-bot/src/namespaces";
import GlobalDB from "../database/Global";

class Player {
  constructor(id, word) {
    this.id = id;
    this.word = word;
    this.wrong = [];
    this.corrects = [];
    this.state = "playing";
  }
}

class Hungman extends Game {
  constructor(tools, threadID) {
    super(tools, {
      name: "hungman",
    });
    this.threadID = threadID;
    this.players = [];
    this.maxWrong = 5;
  }

  setTools(tools) {
    if (!this.tools) this.tools = tools;
  }
  setThreadID(threadID) {
    if (!this.threadID) this.threadID = threadID;
  }

  /**
   *
   * @param {Fca.MessageReply} event
   * @returns {
   * Promise<
   * state: "playing" | "stop" | "error",
   * message: string,
   * isWin: boolean,
   * >
   * }
   */
  async startGame(event) {
    const { senderID, body } = event;
    const user = this.getUser(senderID);
    if (!user) {
      return {
        state: "error",
        message: "❌ Bạn chưa bắt đầu game",
        iswin: false,
      };
    }
    if (!body)
      return {
        state: "error",
        message: "❌ Bạn chưa nhập từ",
        iswin: false,
      };
    let guessletters = body.toLowerCase();
    if (guessletters.length === 1) {
      if (
        user.wrongs.includes(guessletters) ||
        user.corrects.includes(guessletters)
      )
        return {
          state: "error",
          message: "❌ Bạn đã đoán chữ này rồi!",
          iswin: false,
        };
      if (this.isCorrect(user, guessletters)) {
        if (this.isWin(user)) {
          this.removeUser(user.id);
          return {
            state: "stop",
            message: "🎊 Bạn đã thắng! Từ đúng là: " + user.word,
            iswin: true,
          };
        }
        return {
          state: "playing",
          message:
            "🎊 Bạn đã đoán đúng! Từ của bạn là: " +
            this.getHiddenWord(user.word, user.corrects) +
            "\n📣 Reply tin nhắn này để đoán tiếp!",
          iswin: false,
        };
      }
      if (this.isLose(user)) {
        this.removeUser(user.id);
        return {
          state: "stop",
          message: "Bạn đã thua! Từ đúng là: " + user.word,
          iswin: false,
        };
      }
      return {
        state: "playing",
        message: `Bạn đã đoán sai! Bạn còn ${
          this.maxWrong - user.wrongs.length
        } lượt đoán\n📣 Reply tin nhắn này để đoán tiếp!`,
      };
    }
    if (guessletters === user.word) {
      this.removeUser(user.id);
      return {
        state: "stop",
        message: "🎊 Bạn đã thắng! Từ đúng là: " + user.word,
        iswin: true,
      };
    }
    return {
      state: "playing",
      message:
        "Bạn đã đoán sai! Bạn còn " +
        (this.maxWrong - user.wrongs.length) +
        " lượt đoán!\n 📣 Reply tin nhắn này để đoán tiếp!\n",
      isWin: false,
    };
  }

  async createUser(id) {
    const word = await this.getRandomWord();
    if (!word) return null;
    return new Player(id, word);
  }

  addUser(user) {
    if (this.hasUser(user.id)) return false;
    this.players.push(user);
  }

  removeUser(id) {
    if (!this.hasUser(id)) return false;
    this.players = this.players.filter((user) => user.id != id);
  }

  getUser(id) {
    return this.players.find((user) => user.id == id);
  }

  hasUser(id) {
    return this.players.some((user) => user.id == id);
  }

  async initGame(id) {
    const user = await this.createUser(id);
    if (!user)
      return {
        status: false,
        message:
          "❌ Không thể khởi tạo trò chơi vì không có từ nào trong database!",
      };
    this.addUser(user);
    let text = "✨ Chào mừng bạn đến với game hungman\n";
    text += Config.line + "\n";
    text += "👉 Bạn sẽ được chọn một từ ngẫu nhiên và bạn phải đoán từ đó\n";
    text +=
      "👉 Nếu bạn đoán sai quá " + this.maxWrong + " lần thì bạn sẽ thua\n";
    text += "👉 Bạn có thể đoán cả một từ hoặc một chữ cái\n";
    text += Config.line + "\n";
    text += "⚠️ Từ sẽ là tiếng anh\n";
    text += "📢 Reply tin nhắn này để bắt đầu chơi\n";
    text += Config.line + "\n";
    text +=
      "📝 Từ của bạn có " +
      user.word.length +
      " từ là: " +
      this.getHiddenWord(user.word, user.corrects);
    return {
      status: true,
      message: text,
    };
  }

  /**
   *
   * @param {string} word
   * @param {string[]} guess
   */
  getHiddenWord(word, guess) {
    let text = "";
    for (const char of word) {
      if (guess.includes(char)) {
        text += char;
      } else {
        text += "_";
      }
    }
    return text;
  }

  isCorrect(user, letter) {
    if (user.word.includes(letter)) {
      user.corrects.push(letter);
      return true;
    }
    user.wrongs.push(letter);
    return false;
  }

  isWin(user) {
    return this.getHiddenWord(user.word, user.corrects) == user.word;
  }

  isLose(user) {
    return user.wrongs.length >= this.maxWrong;
  }

  static async getWords() {
    const db = await GlobalDB.findOne({ name: "hungman" });
    if (!db) {
      return [];
    }
    return db.words;
  }

  async getRandomWord() {
    const words = await Hungman.getWords();
    if (words.length === 0) {
      return null;
    }
    return words[this.getRandomNumber(0, words.length)];
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   *
   * @param {string[]} words
   */
  static async addWords(words) {
    const db = await GlobalDB.findOne({ name: "hungman" });
    if (!db) {
      await GlobalDB.insert({ name: "hungman", words: words });
      return words;
    }
    const newWords = [];
    for (const word of words) {
      if (!db.words.includes(word)) {
        newWords.push(word);
      }
    }
    await GlobalDB.updateMany(
      { name: "hungman" },
      { $set: { words: [...db.words, ...newWords] } }
    );
    return newWords;
  }
}

export default Hungman;
