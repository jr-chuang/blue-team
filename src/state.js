let state = {
  clock: null,
  scene: null,
  camera: null,
  loader: null,
  player: null,
  sprites: null,
  spriteMaterials: null,
  entities: [],
  keyboard: {
    keys: [],
    getKey: function(keyCode) {
      return (typeof this.keys[keyCode] !== "undefined") ? this.keys[keyCode].curr : null;
    }
  }
};

module.exports = state;
