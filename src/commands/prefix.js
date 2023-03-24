import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces";
import { findBestMatch } from "string-similarity";
import ThreadDB from "../database/Thread";
class Prefix extends Command {
  constructor() {
    super({
      name: "prefix",
      author: "LT.Dũng",
      description: "Thay đổi prefix của bot",
      usage: "<prefix>prefix <prefix mới>",
      permission: CommandSpace.Permission.ADMINBOX,
    });
    this.keywords = [
      "prefix",
      "setprefix",
      "sử dụng",
      "help",
      "dùng bot",
      "cách dùng bot",
      "bot dùng thế nào",
      "bot dùng như nào",
    ];
  }

  /**
   *
   * @param {CommandSpace.OnCallParams} params
   */
  async onCall({ args, event }) {
    if (args.length == 0) {
      const prefix = await this.tools.hook.getPrefix(event);
      let text = "Prefix hiện tại của bot là: " + prefix + "\n";
      text +=
        "Để thay đổi prefix, hãy sử dụng lệnh: " +
        prefix +
        "prefix <prefix mới>";
      return text;
    }
    let newPrefix = args[0];
    const res = await ThreadDB.update(
      { id: event.threadID },
      { $set: { prefix: newPrefix } }
    );
    if (res) {
      return `Đã thay đổi prefix thành ${newPrefix}`;
    }
    return `Đã có lỗi xảy ra!`;
  }

  /**
   *
   * @param {CommandSpace.OnAlwayParams} params
   */
  async onAlway({ event }) {
    if (event.body) {
      const prefix = await this.tools.hook.getPrefix(event);
      if (!event.body.startsWith(prefix)) {
        const { bestMatch } = findBestMatch(event.body, this.keywords);
        if (bestMatch.rating > 0.4) {
          this.tools.message.reply(
            `Bạn có thể sử dụng lệnh ${prefix}help để xem danh sách lệnh!`,
            event.threadID,
            event.messageID
          );
        }
      }
    }
  }
}

export default new Prefix();
