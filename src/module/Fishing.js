import { Game } from "../../utils";
import { Manager } from "fca-dunnn-bot/utils";

/**
 * Description placeholder
 * @date 3/27/2023 - 10:52:37 AM
 *
 * @class PlayerManager
 * @typedef {PlayerManager}
 * @extends {Manager<{
 *
 * }>}
 */
class PlayerManager extends Manager {}

class Fishing extends Game {
  constructor(tools, threadID) {
    super(tools, {
      name: "fishing",
    });
    this.threadID = threadID;
  }
}

export default Fishing;
