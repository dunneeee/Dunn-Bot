import { Command } from "fca-dunnn-bot";
import { CommandSpace } from "fca-dunnn-bot/src/namespaces";

/**
 * Cấu trúc của một file lệnh
 * @date 3/24/2023 - 1:47:51 PM
 *
 * @class Example
 * @typedef {Example}
 * @extends {Command}
 */
class Example extends Command {
  constructor() {
    super({
      name: "example", // Tên của lệnh bắt buộc phải có (không được trùng với tên của lệnh khác)
      author: "your name | any", // Tên tác giả của lệnh (không bắt buộc)
      cooldown: 10000, // Thời gian cooldown của lệnh (ms) -> 10000 = 10s
      description: "Example command", // Mô tả của lệnh
      usage: "<prefix>example", // Cách sử dụng của lệnh <prefix> sẽ được thay thế bằng prefix của bot
      permission: CommandSpace.Permission.USER, // Quyền hạn của lệnh (USER, ADMIN, OWNER, ADMINBOX) nếu không có thì mặc định là USER
    });
  }

  /**
   * Để commment này đẻ vscode hoặc IDE khác gợi ý các biến
   * Hàm được thực thi khi người dùng gọi lệnh
   * @param {CommandSpace.OnCallParams} param0
   */
  async onCall({ api, event }) {
    // Các hàm có callback đều có thể dùng async await hoặc promise
    this.tools.api; // Gồm các hàm của api api https://github.com/dunneeee/facebook-chat-api/blob/master/DOCS.md#

    this.tools.bot; // Cấu hình của bot trong file config.json

    this.tools.controller; // Thao tác với command events v.v
    this.tools.hook; // hook thường dùng getPrefix
    this.tools.message; // Gửi tin nhắn có delay hàm reply
    this.tools.name; // Tên account đang chạy bot
    this.tools.uuid; // uid của account đang chạy bot

    // write your code
  }

  /**
   * Để commment này đẻ vscode hoặc IDE khác gợi ý các biến
   * Hàm sẽ được thực thi khi người dùng reply tin nhắn có trong this.tools.controller.queueReply
   * @param {CommandSpace.OnReplyParams} param0
   */
  async onReply({ event, replyData }) {
    // write your code
  }

  /**
   * Để commment này đẻ vscode hoặc IDE khác gợi ý các biến
   * Hàm sẽ được thực thi khi người dùng react tin nhắn có trong this.tools.controller.queueReaction
   * @param {CommandSpace.OnReactionParams} param0
   */
  async onReaction({ event, reactionData }) {
    // write your code
  }

  /**
   * Để commment này đẻ vscode hoặc IDE khác gợi ý các biến
   * Hàm sẽ được thực thi khi có bất kì tin nhắn hay sự kiện nào gửi đến
   * @param {CommandSpace.OnAlwayParams} param0
   */
  async onAlway({ event }) {
    // write your code
  }

  /**
   * Để commment này đẻ vscode hoặc IDE khác gợi ý các biến
   * Hàm sẽ được thực thi khi có bất kì tin nhắn nào bị gỡ
   * @param {CommandSpace.OnUnSendParams} param0
   */
  async onUnsend({ event }) {
    // write your code
  }
}

export default new Example();
