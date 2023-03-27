import Database from "nedb-promises";

const GlobalDB = Database.create({
  filename: "data/Global.db",
  autoload: true,
});

export default GlobalDB;
