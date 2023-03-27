import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces";
import { Youtube } from "../module";
import { Fs } from "../../utils";
import { Config } from "../../utils";

class Music extends Command {
  constructor() {
    super({
      name: "music",
      description: "Tìm kiếm và phát nhạc trên Youtube",
      usage: "<prefix>music <tên bài hát>",
      author: "LT.Dũng",
    });
    this.youtube = this.getApiKey() ? new Youtube(this.getApiKey()) : null;
    /**
     * @type {Map<string, {
     *  id: string,
     * title: string,
     * thumbnail: string,
     * channel: string,
     * }[]>}
     */
    this.temp = new Map();
  }

  /**
   *
   * @param {CommandSpace.OnCallParams} params
   */
  async onCall({ args, event }) {
    if (!this.youtube)
      return "API Youtube không được cấu hình! Vui lòng liên hệ admin!";
    if (args.length === 0) return "Vui lòng nhập tên bài hát!";
    const { senderID } = event;
    const { api, controller } = this.tools;
    let results;
    try {
      results = await this.youtube.search(args.join(" "), 6);
    } catch (e) {
      return typeof e === "string" ? e : e.error || e.message;
    }
    const text = results
      .map((item, index) => `${index + 1}. ${item.title}`)
      .join("\n");
    try {
      const info = await api.sendMessage(
        `🎵 Kết quả tìm kiếm:\n ${Config.line}\n${text}\n${Config.line}\n🔢 Vui lòng nhập số để chọn bài hát!`,
        event.threadID,
        event.messageID
      );
      this.temp.set(senderID, results);
      controller.queueReply.add(info.messageID, {
        commandName: this.name,
        author: senderID,
      });
      setTimeout(() => {
        this.clearTemp(info.messageID, senderID);
      }, 5 * 60 * 1000);
    } catch (e) {
      return typeof e === "string" ? e : e.error || e.message;
    }
  }

  /**
   *
   * @param {CommandSpace.OnReplyParams} param0
   */
  async onReply({ event, replyData }) {
    let index = Number(event.body.split(/ +/)[0]);
    if (isNaN(index)) return "Vui lòng nhập số!";
    index--;
    const data = this.temp.get(event.senderID);
    if (!data) return "Không tìm thấy kết quả tìm kiếm!";
    if (index < 0 || index >= data.length)
      return "Vui lòng nhập số từ 1 đến 6!";
    const { api } = this.tools;
    const { id, title, thumbnail, channel } = data[index];
    this.tools.message.reply(
      "🪄 Đang tải nhạc...",
      event.threadID,
      event.messageID
    );
    this.clearTemp(event.messageReply.messageID, event.senderID);
    let audioPath;
    try {
      audioPath = await this.youtube.getPathAudioStream(id);
    } catch (e) {
      return typeof e === "string" ? e : e.error || e.message;
    }
    api
      .sendMessage(
        {
          body: `🎵 Đang phát: ${title}\n👤 Kênh: ${channel}`,
          attachment: Fs.getStreamFile(audioPath),
        },
        event.threadID,
        event.messageID
      )
      .then(() => {})
      .catch((e) => {
        console.log(e);
        return api.sendMessage(
          "Không thể phát nhạc! " + e.data.error,
          event.threadID,
          event.messageID
        );
      })
      .catch(() => {})
      .finally(() => {
        Fs.removeFile(audioPath);
        api.unsendMessage(event.messageReply.messageID).catch(() => {});
      });
  }

  getApiKey() {
    const path = Fs.join(__dirname, "../../ExtensionConfig.json");
    if (!Fs.existsSync(path)) return null;
    const config = Fs.readJSON(path);
    if (!config) return null;
    return config.youtubeAPI;
  }

  clearTemp(messageID, senderID) {
    this.temp.delete(senderID);
    this.tools.controller.queueReply.delete(messageID);
  }
}

export default new Music();
