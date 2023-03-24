import { Deploy } from "fca-dunnn-bot";
import appState from "./appState.json";
import { Fs, Logger } from "fca-dunnn-bot/utils";
import MyController from "./src/MyController";
import MyHook from "./src/MyHook";
class App extends Deploy {
  constructor() {
    super();
    if (Fs.existsSync("config.json")) {
      this.setConfig(Fs.readJSON("config.json"));
    }
    this.setHook(new MyHook());
    this.setController(new MyController());
    this.facebook(appState)
      .then((client) => {
        client.message.setDelay(100);
        // Do something with client
      })
      .catch(Logger.error);
  }
}

new App();
