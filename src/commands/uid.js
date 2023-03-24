import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces";

class Uid extends Command {
  constructor() {
    super({
      name: "uid",
      author: "LT.Dũng",
      description: "Lấy ID của người dùng",
      usage: "<prefix>uid <@tag>",
    });
  }

  /**
   *
   * @param {CommandSpace.OnCallParams} param0
   */
  async onCall({ args, event }) {
    const keys = Object.keys(event.mentions);
    if (keys.length == 0) {
      return `ID của bạn là: ${event.senderID}`;
    }
    let text = "";
    for (const key of keys) {
      text += `ID của ${event.mentions[key].replace("@", "")} là: ${key}\n`;
    }
    return text;
  }
}

export default new Uid();
