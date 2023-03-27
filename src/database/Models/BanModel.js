class BanModel {
  constructor(data = {}) {
    if (!data) data = {};
    this.status = data.isBan;
    this.reason = data.reasonBan;
    this.time = data.timeUnBan;
    this.author = data.authorBan;
  }

  setBan({ reason, time, author }) {
    this.status = true;
    this.reason = reason;
    this.time = time;
    this.author = author;
  }

  setUnBan() {
    this.status = false;
    this.reason = "";
    this.time = 0;
    this.author = "";
  }

  /**
   *
   * @returns {{isBan: boolean, reasonBan: string, timeUnBan: number, authorBan: string}}
   */
  getObject() {
    return {
      isBan: this.status,
      reasonBan: this.reason,
      timeUnBan: this.time,
      authorBan: this.author,
    };
  }

  isOutTime() {
    return this.time < Date.now();
  }

  getJSON(format) {
    return JSON.stringify(this.getObject(), null, format);
  }

  static initBan() {
    return {
      isBan: false,
      reasonBan: "",
      timeUnBan: 0,
      authorBan: "",
    };
  }
}

export default BanModel;
