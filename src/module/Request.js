import axios from "axios";
import { Logger } from "../../utils";
class Request {
  static async getWeather(apiKey, cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      cityName
    )}&appid=${apiKey}&units=metric&lang=vi`;
    try {
      const { data } = await axios.get(url);
      if (data.cod !== 200) return Promise.reject(data.message);
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
