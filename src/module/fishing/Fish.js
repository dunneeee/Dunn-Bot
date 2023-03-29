class Fish {
  constructor({ name, rarity, price, weight }) {
    this.name = name;
    this.rarity = rarity;
    this.price = price;
    this.weight = weight;
    this.type = "fish";
  }
  getObject() {
    return {
      name: this.name,
      rarity: this.rarity,
      price: this.price,
      weight: this.weight,
      type: this.type,
    };
  }
}

export default Fish;
