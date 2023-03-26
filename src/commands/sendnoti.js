import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces";

class SendNoti extends Command {
  constructor() {
    super({
      name: "sendnoti",
      description: "Gửi thông báo cho người dùng, nhóm.",
      usage: "<prefix>sendnoti <id> <nội dung>",
      author: "LT.Dũng",
      permission: CommandSpace.Permission.ADMIN,
    });
  }

  /**
   *
   * @param {CommandSpace.OnCallParams} param0
   */
  async onCall({ args, event }) {
    const { bot, api } = this.tools;
    if (args.length === 0) return "Vui lòng nhập ID người dùng hoặc nhóm!";
    if (args.length === 1) return "Vui lòng nhập nội dung thông báo!";
    const id = args[0];
    const content = args.slice(1).join(" ");
    try {
      await api.sendMessage(content, id);
      return "Đã gửi thông báo thành công!";
    } catch (e) {
      return typeof e === "string" ? e : e.error || e.message;
    }
  }
}

export default new SendNoti();
