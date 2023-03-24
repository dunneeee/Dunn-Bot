import axios from "axios";
import { Fs, Logger } from "../../utils";
const config = Fs.readJSON(Fs.join(__dirname, "../../package.json"));
class Project {
  static async checkUpdate() {
    try {
      const { data } = await axios.get(
        "https://raw.githubusercontent.com/dunneeee/Dunn-Bot/main/package.json"
      );
      const { version: newVersion } = data;
      if (!newVersion) {
        return Logger.error("Không tìm thấy phiên bản mới!");
      }
      if (newVersion === config.version) {
        Logger.info("Bạn đang sử dụng phiên bản mới nhất!");
      } else {
        Logger.info(
          "Đã có phiên bản mới: " +
            newVersion +
            "! Gõ lệnh npm run update để cập nhật!"
        );
      }
    } catch (e) {
      Logger.error("Lỗi khi kiểm tra cập nhật: " + e.message);
    }
  }
}

export default Project;
