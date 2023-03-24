import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces";
import { Logger } from "../../utils";

class Feedbank extends Command {
  constructor() {
    super({
      name: "feedback",
      author: "LT.Dũng",
      usage: "<prefix>feedback <nội dung>",
    });
  }

  /**
   *
   * @param {CommandSpace.OnCallParams} param0
   */
  async onCall({ args, event }) {
    const { bot, api } = this.tools;
    if (!bot.ownerID)
      return "Chưa cấu hình ID người dùng quản trị! Không thể gửi phản hồi!";
    if (args.length === 0) return "Vui lòng nhập nội dung phản hồi!";
    const content = args.join(" ");
    try {
      const info = await api.sendMessage(
        `📩 Phản hồi từ ${event.senderID}:\n${content}`,
        bot.ownerID
      );
      return "Đã gửi phản hồi thành công!";
    } catch (e) {
      Logger.error(e);
      Logger.log(e);
      return typeof e === "string" ? e : e.error || e.message;
    }
  }
}

export default new Feedbank();
