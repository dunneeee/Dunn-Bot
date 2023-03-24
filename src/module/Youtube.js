import { google } from "googleapis";
import { Fs, Logger } from "../../utils";
import axios from "axios";
import ytdl from "ytdl-core";
class Youtube {
  constructor(apiKey) {
    this.youtube = google.youtube({
      version: "v3",
      auth: apiKey,
    });
  }

  /**
   * Description placeholder
   * @date 3/24/2023 - 9:02:59 PM
   *
   * @param {*} query
   * @param {number} [maxResults=10]
   * @returns {Promise<{
   *  id: string,
   * title: string,
   * thumbnail: string,
   * channel: string,
   * }[]>}
   */
  search(query, maxResults = 10) {
    return new Promise((reslove, reject) => {
      this.youtube.search.list(
        {
          part: "id, snippet",
          q: query,
          type: "video",
          maxResults,
        },
        (err, res) => {
          if (err) {
            Logger.error(err.message || "Có lỗi khi tìm kiếm!");
            Logger.log(err);
            return reject("Có lỗi khi tìm kiếm!" + err.message);
          }
          const reslut = res.data.items.map((item) => {
            return {
              id: item.id.videoId,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.high.url,
              channel: item.snippet.channelTitle,
            };
          });

          reslove(reslut);
        }
      );
    });
  }

  async getPathStream(videoId) {
    try {
      const res = await ytdl.getInfo(videoId);
      const formats = ytdl.filterFormats(
        res.formats,
        (f) =>
          f.contentLength < 25 * 1024 * 1024 &&
          f.hasAudio &&
          f.hasVideo &&
          f.container === "mp4"
      );
      if (formats.length === 0)
        return Promise.reject("Không tìm thấy định dạng video hợp lệ!");
      const format = formats[0];
      return new Promise((reslove, reject) => {
        let stream = Fs.createTempWriteStream("video" + Date.now() + ".mp4");
        ytdl
          .downloadFromInfo(res, { format })
          .on("error", (e) => {
            reject(e.message);
          })
          .pipe(stream)
          .on("finish", () => {
            reslove(stream.path);
          });
      });
    } catch (e) {
      return Promise.reject(e.error || e.message || "Có lỗi khi lấy video!");
    }
  }
  async getPathAudioStream(videoId) {
    try {
      const res = await ytdl.getInfo(videoId);
      const formats = ytdl.filterFormats(
        res.formats,
        (f) => f.contentLength < 25 * 1024 * 1024 && f.hasAudio
      );
      if (formats.length === 0)
        return Promise.reject("Không tìm thấy định dạng Audio hợp lệ!");
      const format = formats[0];
      return new Promise((reslove, reject) => {
        let stream = Fs.createTempWriteStream("music" + Date.now() + ".mp3");
        ytdl
          .downloadFromInfo(res, { format })
          .on("error", (e) => {
            reject(e.message);
          })
          .pipe(stream)
          .on("finish", () => {
            reslove(stream.path);
          });
      });
    } catch (e) {
      return Promise.reject(e.error || e.message || "Có lỗi khi lấy Music!");
    }
  }
}

export default Youtube;
