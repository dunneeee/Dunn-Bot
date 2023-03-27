import { Fca } from "fca-dunnn-bot/src/namespaces/Fca";
import Datastore from "nedb-promises";

const UserDB = Datastore.create({
  autoload: true,
  filename: "data/user.db",
  timestampData: true,
});

export default UserDB;
