import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces";
import { Fs } from "../../utils";
import { Request } from "../module";
import { Logger } from "fca-dunnn-bot/utils";
import OptionCmdDB from "../database/OptionCmd";

class Weather extends Command {
  constructor() {
    super({
      name: "weather",
      author: "LT.Dũng",
      description: "Lấy thời tiết của một địa điểm",
      usage:
        "<prefix>weather <địa điểm>\n- Cấu hình địa điểm mặc định: <prefix>weather --set <địa điểm>\n- Xem địa điểm mặc định: <prefix>weather --get\n- Xóa địa điểm mặc định: <prefix>weather --del",
    });
    this.apiKey = this.getApiKey();
  }
  /**
   *
   * @param {CommandSpace.OnCallParams} param0
   */
  async onCall({ args, event }) {
    if (!this.apiKey || this.apiKey === "")
      return "Chưa có cấu hình API Key! Vui lòng liên hệ admin!";
    if (args.length === 0) {
      const threadOption = await OptionCmdDB.findOne({ id: event.threadID });
      if (!threadOption?.weatherLocation)
        return "Chưa cấu hình địa điểm mặc định! Gõ help để xem cách cấu hình!";
      return await this.getObjectMessage(threadOption.weatherLocation);
    }
    switch (args[0]) {
      case "--set":
        let lc = args.slice(1).join(" ");
        try {
          await Request.getWeather(this.apiKey, lc);
        } catch (e) {
          return "Có lỗi xảy ra hoặc địa điểm không tồn tại!";
        }
        await OptionCmdDB.update(
          { id: event.threadID },
          { $set: { weatherLocation: lc } },
          { upsert: true }
        );
        return "Đã cấu hình địa điểm mặc định thành công! Địa điểm: " + lc;
      case "--get":
        const ops = await OptionCmdDB.findOne({ id: event.threadID });
        if (!ops?.weatherLocation) return "Chưa cấu hình địa điểm mặc định!";
        return "Địa điểm mặc định: " + ops.weatherLocation;
      case "--del":
        await OptionCmdDB.update(
          { id: event.threadID },
          { $unset: { weatherLocation: "" } }
        );
        return "Đã xóa địa điểm mặc định thành công!";
      default:
        const location = args.join(" ");
        return await this.getObjectMessage(location);
    }
  }

  getApiKey() {
    const path = Fs.join(__dirname, "../../ExtensionConfig.json");
    if (!Fs.existsSync(path)) {
      const data = {
        weatherAPI: "",
      };
      Fs.writeJSON(path, data);
      return data;
    }
    return Fs.readJSON(path)?.weatherAPI || "";
  }

  async getObjectMessage(lactation) {
    let data;
    try {
      data = await Request.getWeather(this.apiKey, lactation);
    } catch (e) {
      Logger.error(e);
      return typeof e === "string" ? e : e.error || e.message;
    }
    let text = data.formatSring();
    let img = await data.getStreamImg();
    return {
      body: text,
      attachment: img ? [img] : [],
    };
  }
}

export default new Weather();
