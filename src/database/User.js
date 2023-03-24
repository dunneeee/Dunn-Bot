import { Fca } from "fca-dunnn-bot/src/namespaces/Fca";
import Datastore from "nedb-promises";

const UserDB = Datastore.create({
  autoload: true,
  filename: "data/user.db",
  timestampData: true,
});

/**
 *
 * @param {{
 *  info: Fca.UserInfo
 * id: string
 * }} data
 */
export const formatUser = (data) => {
  const { id, info } = data;
  return {
    id,
    name: info.name,
    coin: 0,
    level: 0,
    exp: 0,
    isBan: false,
    isAdmin: false,
    reasonBan: "",
    timeUnBan: 0,
  };
};

export default UserDB;
