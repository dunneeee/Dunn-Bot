import { Fs as FsLib } from "fca-dunnn-bot/utils";
import { createReadStream, unlinkSync, createWriteStream } from "fs";
import axios from "axios";
import path from "path";

class Fs extends FsLib {
  static async getStream(path) {
    try {
      const { data } = await axios.get(path, { responseType: "stream" });
      return data;
    } catch (e) {
      return Promise.reject(
        "Có lỗi khi lấy stream: " + (e.message || e.error || "UNKNOWN")
      );
    }
  }

  static getStreamFile(path) {
    return createReadStream(path);
  }

  static removeFile(path) {
    return unlinkSync(path);
  }
  static getTempDir() {
    let path = Fs.join(__dirname, "../temp");
    if (!this.existsSync(path)) {
      this.mkdirSync(path);
    }
    return path;
  }
  static createTempWriteStream(fileName) {
    return createWriteStream(Fs.join(this.getTempDir(), fileName));
  }
}

export default Fs;
