import Datastore from "nedb-promises";

const OptionCmdDB = Datastore.create({
  autoload: true,
  filename: "data/optioncmd.db",
});

export default OptionCmdDB;
