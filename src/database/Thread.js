import { Fca } from "fca-dunnn-bot/src/namespaces/Fca";
import Database from "nedb-promises";

const ThreadDB = Database.create({
  autoload: true,
  filename: "data/thread.db",
});

/**
 *
 * @param {Fca.ThreadInfo} info
 */
export const formatThread = (info) => {
  return {
    id: info.threadID,
    name: info.name,
    isBan: false,
    reasonBan: "",
    timeUnBan: 0,
    prefix: "",
    users: info.participantIDs.map((u) => {
      return {
        id: u,
        isBan: false,
        reasonBan: "",
        timeUnBan: 0,
        exp: 0,
        level: 0,
      };
    }),
  };
};

export default ThreadDB;
