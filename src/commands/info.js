import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces/command";
import ThreadDB from "../database/Thread";
import UserDB from "../database/User";
import { Config } from "../../utils";

class Info extends Command {
  constructor() {
    super({
      name: "info",
      author: "LT.Dũng",
      description: "Thông tin của bot",
      cooldown: 10000,
      usage: "<prefix>info",
    });
  }

  /**
   *
   * @param {CommandSpace.OnCallParams} params
   */
  async onCall(params) {
    const { bot, uuid, controller } = this.tools;
    let info = "";
    info += "Tên: " + bot.name + "\n";
    info += "ID: " + uuid + "\n";
    info += "Version: " + bot.version + "\n";
    info += "Prefix: " + bot.prefix + "\n";
    info += Config.line + "\n";
    info += "Owner: " + bot.owner + "\n";
    info += "Owner ID: " + bot.ownerID + "\n";
    info += Config.line + "\n";
    info += "Số lượng lệnh: " + controller.commands.size + "\n";
    info += "Số nhóm: " + (await ThreadDB.count({})) + "\n";
    info += "Số người dùng: " + (await UserDB.count({})) + "\n";
    info += Config.line + "\n";
    info += bot.description + "\n";
    return info;
  }
}

export default new Info();
