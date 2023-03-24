import { Hook } from "fca-dunnn-bot";
import { Fca } from "fca-dunnn-bot/src/namespaces/Fca";
import ThreadDB from "./database/Thread";

class MyHook extends Hook {
  /**
   *
   * @param {Fca.MessageType} event
   */
  async getPrefix(event) {
    const { bot } = this.config;
    if (event.threadID) {
      const thread = await ThreadDB.findOne({ id: event.threadID });
      if (thread) {
        return thread.prefix || bot.prefix || "!";
      }
    }
    return "!";
  }
}

export default MyHook;
