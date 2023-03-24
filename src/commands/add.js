import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces";
import { Facebook } from "../module";
class Add extends Command {
  constructor() {
    super({
      name: "add",
      description: "Thêm người dùng vào nhóm!",
      usage: "<prefix>add <link>",
      author: "LT.Dũng",
    });
  }
  /**
   *
   * @param {CommandSpace.OnCallParams} param0
   */
  async onCall({ args, event }) {
    const { api } = this.tools;
    if (args.length === 0) return "Vui lòng nhập link!";
    const link = args[0];
    if (!Facebook.checkLinkProfileFacebook(link)) return "Link không hợp lệ!";
    let id;
    try {
      id = await Facebook.getIdWithLink(link);
    } catch (e) {
      return "Không thể lấy ID từ link! " + e;
    }

    try {
      const { participantIDs } = await api.getThreadInfo(event.threadID);
      if (participantIDs.find((eid) => eid == id))
        return "Người dùng đã có trong nhóm!";
    } catch (e) {
      return "Không thể lấy danh sách thành viên! " + e.message;
    }

    try {
      await api.addUserToGroup(id, event.threadID);
      return "Đã thêm thành công!";
    } catch (e) {
      return (
        "Không thể thêm người dùng vào nhóm! " +
        (e.message || e.data.err || e.data.error)
      );
    }
  }
}

export default new Add();
