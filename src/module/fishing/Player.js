import UserModel from "../../database/Models/UserModel";
import Bag from "./Bag";

class Player {
  /**
   *
   * @param {{id: string; name: string; bag: Bag, money: number}} param0
   * @param {UserModel} user
   */
  constructor({ id, name, bag, money }, user) {
    this.id = id;
    this.name = name;
    this.bag = new Bag(bag);
    this.money = money;
    this.type = "player";
    this.user = user;
  }

  getObject() {}
}

export default Player;
