import { Fca } from "fca-dunnn-bot/src/namespaces/Fca";
import Database from "nedb-promises";
import { BanModel } from "./Models/BanModel";
const ThreadDB = Database.create({
  autoload: true,
  filename: "data/thread.db",
});

export default ThreadDB;
