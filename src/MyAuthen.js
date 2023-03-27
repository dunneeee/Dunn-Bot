import { Authen } from "fca-dunnn-bot";
import { AuthenSpace } from "fca-dunnn-bot/src/namespaces";
import { Config, Logger, Time } from "../utils";
import BanModel from "./database/Models/BanModel";
import ThreadModel from "./database/Models/ThreadModel";
import UserModel from "./database/Models/UserModel";
import ThreadDB from "./database/Thread";
import UserDB from "./database/User";
class MyAuthen extends Authen {
  constructor() {
    super();
    this.wasSendNoti = [];
    this.timeToNextSendNoti = 1000 * 60 * 60 * 24;
    // Bỏ commant 2 dòng dưới để bật chức năng cấm người dùng và nhóm
    // this.addToFirst("checkUserBan", this.checkUserBan.bind(this));
    // this.addToFirst("checkThreadBan", this.checkThreadBan.bind(this));
  }

  /**
   * @param {AuthenSpace.FCParams} params
   * @returns {Promise<AuthenSpace.FCReturn>}
   */
  async checkThreadBan(params) {
    const { event } = params;
    const threadID = event.threadID;
    const thread = new ThreadModel(await ThreadDB.findOne({ id: threadID }));
    if (!event.isGroup || !thread.id)
      return {
        status: true,
        message: "Không tìm thấy thông tin nhóm!",
        type: params.name,
      };
    if (thread.banInfo.status) {
      if (thread.banInfo.isOutTime()) {
        thread.banInfo.setUnBan();
        await ThreadDB.update(
          { id: threadID },
          { $set: thread.banInfo.getObject() }
        );
        return {
          status: true,
          message: "🎊 Nhóm đã được bỏ cấm!",
          type: params.name,
        };
      }
      if (!this.isSendNoti(threadID)) {
        this.wasSendNoti.push({
          id: threadID,
          time: Date.now(),
        });
        return {
          status: false,
          message: this.getMessageBan(thread),
          type: params.name,
        };
      }
      return {
        status: false,
        message: null,
        type: params.name,
      };
    }
    return {
      status: true,
      message: "Nhóm không bị cấm!",
      type: params.name,
    };
  }

  /**
   *
   * @param {AuthenSpace.FCParams} params
   * @returns {Promise<AuthenSpace.FCReturn>}
   */
  async checkUserBan(params) {
    const { event } = params;
    const threadID = event.threadID;
    const senderID = event.senderID;
    const user = new UserModel(await UserDB.findOne({ id: senderID }));
    if (user && user.banInfo.status) {
      if (user.banInfo.isOutTime()) {
        user.banInfo.setUnBan();
        await UserDB.update(
          { id: senderID },
          { $set: user.banInfo.getObject() }
        );
        return {
          status: true,
          message: "🎊 Bạn đã được bỏ cấm!",
          type: params.name,
        };
      }
      if (!this.isSendNoti(senderID)) {
        this.wasSendNoti.push({
          id: senderID,
          time: Date.now(),
        });
        return {
          status: false,
          message: this.getMessageBan(user.banInfo),
          type: params.name,
        };
      }
      return {
        status: false,
        message: null,
        type: params.name,
      };
    }
    if (!event.isGroup)
      return {
        status: true,
        message: "Người dùng không bị cấm!",
        type: params.name,
      };
    const thread = new ThreadModel(await ThreadDB.findOne({ id: threadID }));
    if (thread.id) {
      const userInThread = thread.getUser(senderID);
      if (userInThread && userInThread.banInfo.status) {
        if (userInThread.banInfo.isOutTime()) {
          userInThread.banInfo.setUnBan();
          const users = thread.users.map((e) => e.getObject());
          await ThreadDB.update({ id: threadID }, { $set: { users } });
          return {
            status: true,
            message: "🎊 Bạn đã được bỏ cấm!",
            type: params.name,
          };
        }
        if (!this.isSendNoti(senderID)) {
          this.wasSendNoti.push({
            id: senderID,
            time: Date.now(),
          });
          return {
            status: false,
            message: this.getMessageBan(userInThread.banInfo),
            type: params.name,
          };
        }
        return {
          status: false,
          message: null,
          type: params.name,
        };
      }
    }
    return {
      status: true,
      message: "Người dùng không bị cấm!",
      type: params.name,
    };
  }

  isSendNoti(id) {
    const index = this.wasSendNoti.findIndex((e) => e.id === id);
    if (index === -1) return false;
    const time = this.wasSendNoti[index].time;
    if (time + this.timeToNextSendNoti < Date.now()) {
      this.wasSendNoti.splice(index, 1);
      return false;
    }
    return true;
  }

  /**
   *
   * @param {BanModel} param0
   * @returns
   */
  getMessageBan({ reasonBan, timeUnBan, author }) {
    let text = "";
    text += "⚠️ Bạn đã bị cấm sử dụng bot vì: " + reasonBan + "\n";
    text +=
      "⌛ Thời gian đếm ngược: " +
      Time.convertToTime(timeUnBan - Date.now()) +
      "\n";
    text += "🪪 ID người cấm: " + author + "\n";
    text += Config.line + "\n";
    text += "📌 Nếu bạn muốn được bỏ cấm, vui lòng liên hệ admin!";
    return text;
  }
}

export default MyAuthen;
