import { Config, Game } from "../../../utils";
import UserModel from "../../database/Models/UserModel";
import UserDB from "../../database/User";
import Player from "./Player";
import { FishDB } from "./FishDB";
import Bag from "./Bag";
import FishingRod from "./FishingRod";

class FishingGame extends Game {
  constructor(tools, threadID) {
    super(tools, {
      name: "fishing",
    });
    this.threadID = threadID;
    this.players = [];
  }

  async initGame(senderID) {
   if (this.hasPlayer(senderID))
      return {
        status: false,
        message: "❌ Bạn đã tham gia vào game rồi!",
      };
    const player = await this.createPlayer(senderID);
    if (!player)
      return {
        status: false,
        message:
          "❌ Không thể khởi tạo người chơi vì không tìm thấy người dùng trong hệ thống!",
      };
    this.addPlayer(player);
    let text = "";
    text += "🎣 Bạn đã tham gia vào game câu cá!\n";
    text += "✨ Gõ <prefix>game fh để xem hướng dẫn chơi game!\n";
    return {
      status: true,
      message: text,
    };
  }

  hasPlayer(id) {
    return this.players.some((p) => p.id == id);
  }

  addPlayer(player) {
    if (!this.players.some((p) => p.id == player.id)) this.players.push(player);
  }

  getPlayer(id) {
    return this.players.find((p) => p.id == id);
  }

  removePlayer(player) {
    this.players = this.players.filter((p) => p.id != player.id);
  }

  async createPlayer(id) {
    const user = new UserModel(await UserDB.findOne({ id }));
    if (!user.id) return null;
    let bagdb = await FishDB.findOne({ id, type: "bag" });
    let bag;
    if (!bagdb) {
      const dfFishRod = FishingRod.getDefault();
      bag = new Bag({ fishingRod: dfFishRod.getObject(), id, fishs: [] });
    }
    const name = user.name;
    bag = new Bag(bagdb);
    const player = new Player({
      id,
      name,
      money: user.coin,
      bag: bag.getObject(),
    });
    return player;
  }
}

class Test {
con

}

export default FishingGame;
