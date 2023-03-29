import Fish from "./Fish";

class Lake {
  constructor({ name, fishs }, features = {}) {
    this.name = name;
    this.fishs = fishs.map((f) => new Fish(f));
    this.features = features;
    this.type = "lake";
  }

  getObject() {
    return {
      name: this.name,
      fishs: this.fishs.map((f) => f.getObject()),
      features: this.features,
      type: this.type,
    };
  }
}

export default Lake;
