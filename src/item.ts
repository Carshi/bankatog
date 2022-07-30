class Item {
  character: string;
  name: string;
  location: string;
  count: number;

  constructor(character: string, name: string, location: string, count: number) {
    this.character = character;
    this.name = name;
    this.location = location === "Bank" ? location : "Inventory";
    this.count = count;
  }

  equals(other: Item) {
    if (typeof other != typeof this) return false;

    return other.character === this.character
      && other.name === this.name
      && other.location === this.location;
  }
}

export { Item };
