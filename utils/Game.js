import { CommandSpace, Fca } from "fca-dunnn-bot/src/namespaces";

/**
 * Description placeholder
 * @date 3/26/2023 - 10:07:49 AM
 *
 * @class Game
 * @typedef {Game<T>}
 */
class Game {
  /**
   *
   * @param {CommandSpace.Tools} tools
   * @param {{
   * name: string
   * }} name
   */
  constructor(name) {
    this.tools = null;
    this.name = name;
    this.player = null;
  }

  setTools(tools) {
    if (!this.tools) this.tools = tools;
  }

  setPlayer(player) {
    this.player = player;
  }

  async startGame(event) {}

  async initGame(senderID) {}
}

export default Game;
