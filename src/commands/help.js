import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces/command";
import { MyArray } from "../module";
import { Config } from "../../utils";

class Help extends Command {
  constructor() {
    super({
      name: "help",
      author: "LT.Dũng",
      description: "Xem danh sách lệnh, hướng dẫn sử dụng!",
      usage: "<prefix>help <trang>| <prefix>help <tên lệnh>",
    });
    this.pageSize = 5;
  }

  /**
   *
   * @param {CommandSpace.OnCallParams} params
   */
  async onCall(params) {
    const { args, event } = params;
    const prefix = await this.tools.hook.getPrefix(event);
    if (args.length == 0 || !args[0]) {
      return this.getHelps(1, prefix);
    }
    if (!isNaN(args[0])) {
      return this.getHelps(args[0], prefix);
    }
    const command = this.tools.controller.commands.get(args[0]);
    if (!command) {
      const rating = this.tools.controller.commands.ratingKeyword(args[0]);
      if (rating.rating >= 0.3) {
        return `Không tìm thấy lệnh ${args[0]}, bạn có muốn tìm lệnh ${rating.target}?`;
      }
      return `Không tìm thấy lệnh ${args[0]}`;
    }
    let text = "";
    text += `- Tên lệnh: ${command.name}\n`;
    text += `- Tác giả: ${command.author}\n`;
    text += `- Mô tả: ${command.description}\n`;
    text += `- Cách sử dụng: ${command.usage.replace(/<prefix>/gm, prefix)}\n`;
    text += `- Quyền hạn: ${command.permission}\n`;
    return text;
  }
  getHelps(page, prefix) {
    const { controller } = this.tools;
    let text = "Danh sách lệnh của bot:\n";
    const allCommand = controller.commands.values;
    if (page > Math.ceil(allCommand.length / this.pageSize))
      return this.getHelps(1, prefix);
    const totalPage = Math.ceil(allCommand.length / this.pageSize);
    const commands = MyArray.splitPage(allCommand, this.pageSize)[page - 1];
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      text += `${i + 1}. ${command.name} - ${command.description}\n`;
    }
    text += Config.line + "\n";
    text +=
      "- Để xem chi tiết lệnh, hãy sử dụng lệnh: " +
      prefix +
      "help <tên lệnh>\n";
    text += `- Trang [${page}/${totalPage}]`;
    return text;
  }
}

export default new Help();
