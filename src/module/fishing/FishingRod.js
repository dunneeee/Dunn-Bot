class FishingRod {
  constructor({ name, price, rate, weight, length, durability }) {
    this.name = name;
    this.price = price;
    this.rate = rate;
    this.weight = weight;
    this.length = length;
    this.durability = durability;
    this.type = "fishingRod";
  }

  getObject() {
    return {
      name: this.name,
      price: this.price,
      rate: this.rate,
      weight: this.weight,
      length: this.length,
      durability: this.durability,
      type: this.type,
    };
  }
  static getDefault() {
    return new FishingRod({
      name: "Cần câu gỗ",
      durability: 100,
      length: 1,
      weight: 0.6,
      price: 1000,
      rate: 20,
    });
  }
}

export default FishingRod;
