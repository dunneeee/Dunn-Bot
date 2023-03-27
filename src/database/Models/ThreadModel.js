import { Fca } from "fca-dunnn-bot/src/namespaces";
import BanModel from "./BanModel";

export class UserOfThread {
  constructor(data = {}) {
    if (!data) data = {};
    this.id = data.id;
    this.exp = data.exp;
    this.level = data.level;
    this.banInfo = new BanModel(data);
  }

  getObject() {
    return {
      id: this.id,
      exp: this.exp,
      level: this.level,
      ...this.banInfo.getObject(),
    };
  }
  getJson(format) {
    return JSON.stringify(this.getObject(), null, format);
  }

  static formatUser(id) {
    return {
      id,
      exp: 0,
      level: 0,
      ...BanModel.initBan(),
    };
  }
}

/**
 * Description placeholder
 * @date 3/27/2023 - 8:31:10 AM
 *
 * @class ThreadModel
 * @typedef {ThreadModel}
 */
class ThreadModel {
  /**
   *
   * @param {{id: string
   * name: string
   * prefix: string
   * isBan: boolean
   * reasonBan: string
   * timeUnBan: number
   * authorBan: string
   * users: {
   * id: string
   * exp: number
   * level: number
   * isBan: boolean
   * reasonBan: string
   * timeUnBan: number
   * authorBan: string
   * }[]
   * }} data
   */
  constructor(data) {
    if (!data) data = {};
    this.id = data.id;
    this.name = data.name;
    this.prefix = data.prefix;
    this.banInfo = new BanModel(data);
    this.users = data?.users?.map((u) => new UserOfThread(u));
  }

  /**
   *
   * @param {string} id
   * @returns {UserOfThread}
   */
  getUser(id) {
    return this.users.find((u) => u.id == id);
  }

  removeUser(id) {
    this.users = this.users.filter((u) => u.id != id);
  }

  hasUser(id) {
    return this.users.some((u) => u.id == id);
  }

  addUser(id) {
    if (!this.hasUser(id))
      this.users.push(new UserOfThread(UserOfThread.formatUser(id)));
  }

  getObject() {
    return {
      id: this.id,
      name: this.name,
      prefix: this.prefix,
      ...this.banInfo.getObject(),
      users: this.users.map((u) => u.getObject()),
    };
  }

  getJson(format) {
    return JSON.stringify(this.getObject(), null, format);
  }

  /**
   *
   * @param {Fca.ThreadInfo} info
   */
  static formatThread(info) {
    return {
      id: info.threadID,
      name: info.name,
      prefix: "!",
      ...BanModel.initBan(),
      users: info.participantIDs.map((u) => UserOfThread.formatUser(u)),
    };
  }
}

export default ThreadModel;
