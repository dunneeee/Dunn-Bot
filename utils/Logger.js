import { LogerrClass, Logger as Lg } from "fca-dunnn-bot/utils";

class Logger extends LogerrClass {
  constructor() {
    super();
    this.setDev(true);
  }
}

export default new Logger();
