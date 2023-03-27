import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces";
import { Config } from "../../utils";
import ThreadModel from "../database/Models/ThreadModel";
import ThreadDB from "../database/Thread";
import UserDB from "../database/User";

class Thread extends Command {
  constructor() {
    super({
      name: "thread",
      description: "Một số thao tác liên quan đến nhóm",
      usage: "<prefix>thread <thao tác> <tham số>",
      author: "LT.Dũng",
    });
  }

  /**
   *
   * @param {CommandSpace.OnCallParams} param0
   */
  async onCall({ args, event }) {
    if (!event.isGroup) return "Lệnh này chỉ dành cho nhóm!";
    const { bot, api } = this.tools;
    if (args.length === 0) return this.getHelp();
    const action = args[0].toLowerCase();
    switch (action) {
      case "info":
        return await this.getInfoThread(event.threadID);
      case "update":
        return "🆙 Chức năng đang phát triển!";
      default:
      case "ban":
        break;
    }
  }

  async getInfoThread(threadID) {
    const { api, hook, bot } = this.tools;
    const threadW = await api.getThreadInfo(threadID);
    const threadD = new ThreadModel(await ThreadDB.findOne({ id: threadID }));
    let text = "🎪 Thông tin nhóm " + "\n";
    text += Config.line + "\n";
    text += "📝 Tên nhóm: " + threadW.name + "\n";
    text += "🆔 ID nhóm: " + threadW.threadID + "\n";
    text += "👤 Số thành viên: " + threadW.participantIDs.length + "\n";
    text += "👤 Số quản trị viên: " + threadW.adminIDs.length + "\n";
    text += "🔢 Số tin nhắn: " + threadW.messageCount + "\n";
    text += Config.line + "\n";
    text += "💻 Cơ sở dữ liệu: " + (threadD.id ? "Có" : "Không") + "\n";
    if (threadD.id) {
      text += "📝 Tên nhóm: " + threadD.name + "\n";
      text +=
        "🚨 Trạng thái nhóm: " +
        (threadD.banInfo.status ? "Bị cấm" : "Hoạt động") +
        "\n";
      text +=
        threadD.banInfo.status === true
          ? "📝 Lý do: " + threadD.banInfo.reason + "\n"
          : "";
      text += "👤 Số thành viên: " + threadD.users.length + "\n";
      text +=
        "⚠️ Số thành viên bị cấm: " +
        threadD.users.filter((u) => u.banInfo.status).length +
        "\n";
    }
    text += Config.line + "\n";
    text +=
      "🪛 Prefix: " +
      (threadD.id
        ? threadD.prefix?.length
          ? threadD.prefix
          : bot.prefix
        : bot.prefix) +
      "\n";
    text += Config.line + "\n";
    text +=
      "🔔 Nếu sai thông tin ở cơ sở dữ liệu, vui lòng dùng cờ update để cập nhật thông tin!";
    return text;
  }

  getHelp() {
    return "📚 Hướng dẫn sử dụng lệnh thread\n";
  }
}

export default new Thread();
