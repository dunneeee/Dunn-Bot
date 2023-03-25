import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces";
import OptionCmdDB from "../database/OptionCmd";
import { Facebook } from "../module";
import UserDB from "../database/User";
class Unsend extends Command {
  constructor() {
    super({
      name: "unsend",
      author: "LT.Dũng",
      description: "Xóa tin nhắn đã gửi của bot!",
      usage: "<prefix>unsend <reply>",
    });
    this.allowUserUses = null;
    this.facebook = null;
  }

  /**
   *
   * @param {CommandSpace.OnCallParams} param0
   */
  async onCall({ event, args }) {
    if (!this.facebook) this.facebook = new Facebook(this.tools.api);
    if (!this.allowUserUses) {
      this.allowUserUses = await this.getAllowUserUses();
    }
    if (event.type != "message_reply") {
      let flag = args[0];
      if (!flag)
        return "Vui lòng reply tin nhắn của bot để xóa! Gõ help để xem cách sử dụng!";
      switch (flag.toLowerCase()) {
        case "--ucu":
          if (
            !(await this.isAdminBot(event.senderID)) &&
            !(await this.facebook.isAdminGroup(event.senderID, event.threadID))
          )
            return "Bạn không phải là admin nhóm! Không thể chỉnh sửa cài đặt!";
          if (!this.allowUserUses[event.threadID]) {
            this.allowUserUses[event.threadID] = true;
            await OptionCmdDB.update(
              { id: event.threadID },
              { $set: { allowUserUse: true } },
              { upsert: true }
            );
            return "Đã bật chế độ cho phép người dùng xóa tin nhắn của bot!";
          }
          this.allowUserUses[event.threadID] = false;
          await OptionCmdDB.update(
            { id: event.threadID },
            { $set: { allowUserUse: false } }
          );
          return "Đã tắt chế độ cho phép người dùng xóa tin nhắn của bot!";
        default:
          return "Vui lòng reply tin nhắn của bot để xóa! Gõ help để xem cách sử dụng!";
      }
    }
    if (
      !(await this.isAdminBot(event.senderID)) &&
      !this.allowUserUses[event.threadID] &&
      !(await this.facebook.isAdminGroup(event.senderID, event.threadID))
    )
      return "Chế độ chỉ cho phép admin box xóa tin nhắn của bot được bật!";
    const { api } = this.tools;
    if (event.messageReply.senderID != this.tools.uuid)
      return "Không thể xóa tin nhắn của người dùng!";
    try {
      await api.unsendMessage(event.messageReply.messageID);
    } catch (e) {
      return "Không thể xóa tin nhắn! " + (e.message || e.data.error);
    }
  }

  async getAllowUserUses() {
    const ops = await OptionCmdDB.find({});
    if (ops.length == 0) return {};
    const results = {};
    for (let op of ops) {
      if (!op.allowUserUse) continue;
      results[op.id] = true;
    }
    return results;
  }
  async isAdminBot(id) {
    return id == this.tools.bot.ownerID
      ? true
      : (await UserDB.find({ id, isAdmin: true }))
      ? true
      : false;
  }
}

export default new Unsend();
