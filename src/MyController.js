import { Command, Controller, Event } from "fca-dunnn-bot";
import { Facebook, Project } from "./module";
import { Fs, Logger } from "fca-dunnn-bot/utils";
import fs from "fs";
import { Fca } from "fca-dunnn-bot/src/namespaces/Fca";
import MyAuthen from "./MyAuthen";
import { Config } from "../utils";
class MyController extends Controller {
  constructor() {
    super();
    this.authens = new MyAuthen();
  }

  /**
   *
   * @param {import("fca-dunnn-bot/src/namespaces/deploy").DeploySpace.Config} param0
   */
  async load(config) {
    await Project.checkUpdate();
    const pConfig = "config.json";
    if (!Fs.existsSync(pConfig)) {
      Fs.writeJSON(pConfig, {
        ...config,
        devMode: undefined,
        _document: "Does not change version number!",
      });
      Logger.info(
        "Đã tạo file config.json có nội dung là: " +
          JSON.stringify(config, null, 2)
      );
    }
    const pCommand = Fs.join(__dirname, "./commands");
    const pEvent = Fs.join(__dirname, "./events");
    if (!Fs.existsSync(pCommand)) {
      Fs.mkdirSync(pCommand);
    }
    if (!Fs.existsSync(pEvent)) {
      Fs.mkdirSync(pEvent);
    }
    const commandCount = this.loadCommand(pCommand);
    const eventCount = this.loadEvent(pEvent);
    Logger.info("Đã load thành công " + commandCount + " lệnh");
    Logger.info("Đã load thành công " + eventCount + " sự kiện");
    Logger.info(Config.line + Config.line);
  }
  loadCommand(pCommand) {
    const cFiles = fs.readdirSync(pCommand);
    let cout = 0;
    for (let file of cFiles) {
      if (
        file.endsWith(".js") &&
        !file.includes("example") &&
        !file.includes("index")
      ) {
        /**
         * @type {Command}
         */
        const command = require(Fs.join(pCommand, file)).default;
        if (!command.name) {
          Logger.error(`Lỗi khi load lệnh ${file}: Không có thuộc tính name`);
        }
        const res = this.commands.add(command);
        if (res) {
          Logger.info(`Đã load thành công lệnh ${command.name} --> ${file}`);
          cout++;
        } else {
          Logger.error(`Lỗi khi load lệnh ${file}: Lệnh đã tồn tại!`);
        }
      }
    }
    return cout;
  }
  loadEvent(pEvent) {
    const eFiles = fs.readdirSync(pEvent);
    let cout = 0;
    for (let file of eFiles) {
      if (
        file.endsWith(".js") &&
        !file.includes("example") &&
        !file.includes("index")
      ) {
        /**
         * @type {Event}
         */
        const event = require(Fs.join(pEvent, file)).default;
        if (!event.name) {
          Logger.error(
            `Lỗi khi load sự kiện ${file}: Không có thuộc tính name`
          );
        }
        const res = this.events.add(event);
        if (!res) {
          Logger.error(`Lỗi khi load sự kiện ${file}: Sự kiện đã tồn tại!`);
        } else {
          Logger.info(`Đã load thành công sự kiện ${event.name} --> ${file}`);
          cout++;
        }
      }
    }
    return cout;
  }
  /**
   *
   * @param {import("fca-dunnn-bot/src/namespaces/login").LoginSpace.Client} param0
   */
  async login({ api }) {
    this.tool = new Facebook(api);
  }
  /**
   *
   * @param {import("fca-dunnn-bot/src/namespaces/controller").ControllerSpace.HookParams} param0
   */
  async hook({ event, uuid, api, bot, message }) {
    if (
      event.type == "message" ||
      event.type == "message_reply" ||
      event.type == "message_reaction"
    ) {
      if (event.isGroup) {
        const resThread = await this.tool.checkAndCreateThread(event.threadID);
        if (resThread) {
          Logger.info(resThread);
        }
      }
      const resUser = await this.tool.checkAndCreateUser(event.senderID);
      if (resUser) {
        Logger.info(resUser);
      }
    }
    if (event.type == "event") {
      if (event.logMessageType == "log:subscribe") {
        /**
         * @type {Fca.AddedParticipant[]}
         */
        const data = event.logMessageData.addedParticipants;
        for (let item of data) {
          if (item.userFbId == uuid) {
            const resThread = await this.tool.checkAndCreateThread(
              event.threadID
            );
            if (resThread) {
              Logger.info(resThread);
            }
            const nickname = `[${bot.prefix || "!"}] ● ${bot.name}`;
            await api.changeNickname(nickname, event.threadID, uuid);
            if (bot.description) {
              await message.reply(bot.description, event.threadID);
            }
            break;
          }
        }
      }
    }
  }
}

export default MyController;
