import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces";
import { Config, Fs } from "../../utils";
import { Request } from "../module";
import { Logger } from "fca-dunnn-bot/utils";

class Weather extends Command {
  constructor() {
    super({
      name: "weather",
      author: "LT.Dũng",
      description: "Lấy thời tiết của một địa điểm",
      usage: "<prefix>weather <địa điểm>",
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
    if (args.length === 0) return "Vui lòng nhập địa điểm!";
    const location = args.join(" ");
    let data;
    try {
      data = await Request.getWeather(this.apiKey, location);
    } catch (e) {
      Logger.error(e);
      return typeof e === "string" ? e : e.error || e.message;
    }
    let text = "";
    text += `🏡 Thời tiết tại ${data.name}:\n`;
    text += Config.line + "\n";
    text += `🌡️ Nhiệt độ: ${data.main.temp}°C\n`;
    text += `🌡️ Nhiệt độ thấp nhất: ${data.main.temp_min}°C\n`;
    text += `🌡️ Nhiệt độ cao nhất: ${data.main.temp_max}°C\n`;
    text += Config.line + "\n";
    text += `💦 Độ ẩm: ${data.main.humidity}%\n`;
    text += `🌬️ Tốc độ gió: ${data.wind.speed}m/s\n`;
    text += `🌤️ Thời tiết: ${data.weather.description}\n`;
    const response = {
      body: text,
      attachment: [],
    };
    try {
      const imgStream = await Fs.getStream(data.weather.iconLink);
      response.attachment.push(imgStream);
    } catch (e) {
      Logger.error(e);
    }
    return response;
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
}

export default new Weather();
