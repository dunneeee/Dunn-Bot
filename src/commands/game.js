import { CommandSpace } from "fca-dunnn-bot/src/namespaces";
import Hangman from "../module/Hangman";
import UserModel from "../database/Models/UserModel";
import UserDB from "../database/User";
import { Config } from "../../utils";

const { Command } = require("fca-dunnn-bot");

class Game extends Command {
  constructor() {
    super({
      name: "game",
      description: "Các mini game của bot",
      author: "LT.Dũng",
      usage: "<prefix>game <tên game>",
    });
    this.games = {
      hangman: new Hangman(),
    };
  }

  /**
   *
   * @param {CommandSpace.OnCallParams} param0
   */
  async onCall({ args, event }) {
    let gameName = args[0];
    if (!gameName) {
      const prefix = await this.tools.hook.getPrefix(event);
      return this.getListGameName().replace(/<prefix>/g, prefix);
    }
    if (gameName == "hangman") {
      if (args[1] && event.senderID == this.tools.bot.ownerID) {
        const list = args.slice(1);
        const resList = await Hangman.addWords(
          list.map((k) => k.toLowerCase())
        );
        return `Đã thêm ${resList.length} từ vào database`;
      }
      const user = new UserModel(await UserDB.findOne({ id: event.senderID }));
      const hangmanRes = await this.games.hangman.initGame(
        event.senderID,
        user.name,
        event.threadID,
        this.tools
      );
      switch (hangmanRes.type) {
        case "has_player":
        case "error":
          return hangmanRes.message;
        case "success":
          const info = await this.tools.message.reply(
            hangmanRes.message,
            event.threadID,
            event.messageID
          );
          this.tools.controller.queueReply.add(info.messageID, {
            commandName: this.name,
            author: event.senderID,
            type: "hangman",
          });
          break;
        default:
          throw new Error("Invalid response type!");
      }
      return;
    }

    return "🚫 Game không tồn tại!";
  }

  getListGameName() {
    let list = "🎮 Danh sách các game:\n";
    list += Config.line + "\n";
    for (let gameName in this.games) {
      list += `🕹️ ${gameName}\n`;
    }
    list += Config.line + "\n";
    list += "📌 Sử dụng <prefix>game <tên game> để chơi";
    return list;
  }

  /**
   *
   * @param {CommandSpace.OnReplyParams} param0
   */
  async onReply({ event, replyData }) {
    if (replyData.type == "hangman") {
      const hangmanRes = await this.games.hangman.startGame({ event });
      switch (hangmanRes.type) {
        case "error":
        case "end":
          return hangmanRes.message;
        case "success":
          const info = await this.tools.message.reply(
            hangmanRes.message,
            event.threadID,
            event.messageID
          );
          this.tools.controller.queueReply.add(info.messageID, {
            commandName: this.name,
            author: event.senderID,
            type: "hangman",
          });
          break;
      }
    }
  }
}

export default new Game();
