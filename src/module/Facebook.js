import { Fca } from "fca-dunnn-bot/src/namespaces/Fca";
import UserDB, { formatUser } from "../database/User";
import { Logger, Fs } from "../../utils";
import ThreadDB, { formatThread } from "../database/Thread";
import axios from "axios";
import qs from "qs";
class Facebook {
  /**
   *
   * @param {Fca.Api} api
   */
  constructor(api) {
    this.api = api;
  }

  async checkAndCreateUser(id) {
    const userInDb = await UserDB.findOne({ id });
    if (!userInDb) {
      try {
        const info = (await this.api.getUserInfo(id))?.[id];
        const user = formatUser({ id, info });
        await UserDB.insert(user);
        return (
          "Đã tạo user thành công người dùng " + info.name + " (ID: " + id + ")"
        );
      } catch (e) {
        Logger.error(e);
        Logger.log(e);
        return null;
      }
    }
    return null;
  }

  async checkAndCreateThread(id) {
    const threadInDb = await ThreadDB.findOne({ id });
    if (!threadInDb) {
      try {
        const info = await this.api.getThreadInfo(id);
        const thread = formatThread(info);
        await ThreadDB.insert(thread);
        return (
          "Đã tạo thread thành công thread " + info.name + " (ID: " + id + ")"
        );
      } catch (e) {
        Logger.error(e);
        Logger.log(e);
        return null;
      }
    }
    return null;
  }

  async isAdminGroup(id, groupID) {
    const { adminIDs, isGroup } = await this.api.getThreadInfo(groupID);
    if (!isGroup) return false;
    return adminIDs.some((ad) => ad.id === id);
  }

  static async getIdWithLink(link) {
    try {
      const { data } = await axios.post(
        "https://id.traodoisub.com/api.php",
        qs.stringify({ link })
      );
      if (data.code !== 200)
        return Promise.reject("Có lỗi khi lấy id: " + data.error);
      return data.id;
    } catch (e) {
      console.log(e);
      return Promise.reject(" Có lỗi khi lấy id: " + e.message);
    }
  }
  static checkLinkProfileFacebook(link) {
    if (!link) return false;
    const regex = /https:\/\/(www.)*facebook.com\/(.*)/;
    return regex.test(link);
  }
}

export default Facebook;
