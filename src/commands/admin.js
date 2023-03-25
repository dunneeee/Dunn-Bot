import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces";

class Admin extends Command {
  constructor() {
    super({
      name: "admin",
      description: "Xem, quản lý admin của bot",
      author: "LT.Dũng",
      permission: CommandSpace.Permission.OWNER,
      cooldown: 0,
      usage: "<prefix>admin --<add|remove|list> <id/@tag>",
    });
  }

  /**
   *
   * @param {CommandSpace.OnCallParams} param0
   */
  async onCall({ event, args }) {
    return "Chức năng đang được phát triển!";
  }
}

export default new Admin();
