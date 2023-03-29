import Database from "nedb-promises";

const FishDB = Database.create({
  autoload: true,
  filename: "data/fishing/fish.db",
});

export { FishDB };
