export default class Tile {
  #tileElement;
  #x;
  #y;
  #value;

  constructor(tileContainer, value = Math.random() > 0.5 ? 2 : 4) {
    this.#tileElement = document.createElement('div');
    this.#tileElement.classList.add('tile');
    tileContainer.append(this.#tileElement);
    this.value = value;
  }

  set value(v) {
    this.#value = v;
    this.#tileElement.textContent = v;
    const power = Math.log2(v);
    const bgLightness = 100 - power * 9;
    this.#tileElement.style.setProperty('--bg-lightness', `${bgLightness}%`);
    this.#tileElement.style.setProperty(
      '--text-lightness',
      `${bgLightness <= 50 ? 90 : 10}%`
    );
  }

  set x(val) {
    this.#x = val;
    this.#tileElement.style.setProperty('--x', val);
  }

  set y(val) {
    this.#y = val;
    this.#tileElement.style.setProperty('--y', val);
  }
}
