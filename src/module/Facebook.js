import { Fca } from "fca-dunnn-bot/src/namespaces/Fca";
import UserDB, { formatUser } from "../database/User";
import { Logger } from "fca-dunnn-bot/utils";
import ThreadDB, { formatThread } from "../database/Thread";
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
}

export default Facebook;
