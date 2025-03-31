export class Pokemon {
    constructor({ id, name, abilities, stats, sprites }) {
      this.id = id;
      this.name = name;
      this.abilities = abilities;
      this.stats = stats;
      this.sprite = sprites.front_default;
    }
  }  