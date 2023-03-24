import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces";
import { Logger } from "../../utils";

class Kick extends Command {
  constructor() {
    super({
      name: "kick",
      description: "Kick người dùng khỏi nhóm!",
      usage: "<prefix>kick <@tags>",
      permission: CommandSpace.Permission.ADMINBOX,
    });
  }

  /**
   *
   * @param {CommandSpace.OnCallParams} param0
   */
  async onCall({ args, event }) {
    const { api, uuid } = this.tools;
    const { mentions } = event;
    let keys = Object.keys(mentions);
    if (keys.length === 0) return "Vui lòng tag người dùng cần kick!";
    try {
      const { adminIDs } = await api.getThreadInfo(event.threadID);
      if (!adminIDs.find((e) => e.id == uuid))
        return "❌ Bot không có quyền kick người dùng! Vui lòng thêm bot vào nhóm với quyền quản trị!";
    } catch (e) {
      Logger.log(e);
      Logger.error(e);
      return "❌ Có lỗi xảy ra! Vui lòng thử lại sau!";
    }
    await this.onKick(keys);
    return "✅ Đã kick thành công!";
  }

  /**
   *
   * @param {string[]} keys
   */
  async onKick(keys) {
    let id = keys.shift();
    if (!id) return;
    if (id == this.tools.uuid) return this.onKick(keys);
    try {
      await this.tools.api.removeUserFromGroup(id, event.threadID);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await this.onKick(keys);
    } catch (e) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await this.onKick(keys);
    }
  }
}

export default new Kick();
