import Fish from "./Fish";
import FishingRod from "./FishingRod";

class Bag {
  constructor({ fishs, fishingRod, id }) {
    this.id = id;
    this.fishs = fishs.map((f) => new Fish(f));
    this.fishingRod = new FishingRod(fishingRod);
    this.type = "bag";
  }

  getObject() {
    return {
      fishs: this.fishs.map((f) => f.getObject()),
      type: this.type,
    };
  }
}
export default Bag;
