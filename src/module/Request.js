import axios from "axios";
import { Config, Fs, Logger } from "../../utils";
class Request {
  static async getWeather(apiKey, cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      cityName
    )}&appid=${apiKey}&units=metric&lang=vi`;
    try {
      const { data } = await axios.get(url);
      if (data.cod !== 200) {
        if (data.cod === 404) return Promise.reject("Không tìm thấy địa điểm!");
        return Promise.reject(data.message);
      }
      return {
        weather: {
          main: data.weather[0].main,
          description: data.weather[0].description,
          iconLink: data.weather[0].icon
            ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            : "http://openweathermap.org/img/wn/10d@2x.png",
        },
        main: {
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
        },
        sys: {
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
        },
        wind: {
          speed: data.wind.speed,
          deg: data.wind.deg,
        },
        name: data.name,
        formatSring() {
          let text = "";
          text += `🏡 Thời tiết tại ${this.name}:\n`;
          text += Config.line + "\n";
          text += `🌡️ Nhiệt độ: ${this.main.temp}°C\n`;
          text += `🌡️ Nhiệt độ thấp nhất: ${this.main.temp_min}°C\n`;
          text += `🌡️ Nhiệt độ cao nhất: ${this.main.temp_max}°C\n`;
          text += Config.line + "\n";
          text += `💦 Độ ẩm: ${this.main.humidity}%\n`;
          text += `🌬️ Tốc độ gió: ${this.wind.speed}m/s\n`;
          text += `🌤️ Thời tiết: ${this.weather.description}\n`;
          return text;
        },
        async getStreamImg() {
          try {
            return await Fs.getStream(this.weather.iconLink);
          } catch (e) {
            Logger.error(e);
            return null;
          }
        },
      };
    } catch (e) {
      Logger.error(e);
      Logger.log(e);
      return Promise.reject(
        e?.data?.mesage || e.message || e.error || "UNKNOWN"
      );
    }
  }
}

export default Request;
