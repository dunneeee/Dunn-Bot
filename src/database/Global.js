import Database from "nedb-promises";

const GlobalDB = Database.create({
  filename: "src/database/Global.db",
  autoload: true,
});

export default GlobalDB;
