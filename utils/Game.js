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
   * }} game
   */
  constructor(tools, game) {
    this.tools = tools;
    this.game = game;
  }

  async startGame(event) {}

  async initGame(event) {}
}

export default Game;
