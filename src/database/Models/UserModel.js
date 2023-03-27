import { Fca } from "fca-dunnn-bot/src/namespaces";
import BanModel from "./BanModel";

class UserModel {
  constructor(data) {
    if (!data) data = {};
    this.id = data.id;
    this.name = data.name;
    this.coin = data.coin;
    this.exp = data.exp;
    this.level = data.level;
    this.banInfo = new BanModel(data);
  }

  getObject() {
    return {
      id: this.id,
      name: this.name,
      coin: this.coin,
      exp: this.exp,
      level: this.level,
      ...this.banInfo.getObject(),
    };
  }
  getJson(format) {
    return JSON.stringify(this.getObject(), null, format);
  }

  /**
   *
   * @param {{
   * id: string
   * info: Fca.UserInfo
   * }} data
   */
  static formatUser(data) {
    const { id, info } = data;
    return {
      id,
      name: info.name,
      coin: 0,
      level: 0,
      exp: 0,
      ...BanModel.initBan(),
    };
  }
}

export default UserModel;
