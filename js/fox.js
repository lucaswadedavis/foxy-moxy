// TODO: use query params for these
var gen = require('random-seed');

// move to helper function
var genBetween = function (min, max) {
  return min + (max - min) * gen();
}

var Fox = function (IMG_WIDTH, IMG_HEIGHT) {

  // head top left corner
  var origin = {x: IMG_WIDTH / 4, y: IMG_HEIGHT / 4};
  // TODO: head headWidth and height
  var headWidth = IMG_WIDTH / 2;
  var headHeight = IMG_HEIGHT / 2;

  var ears = (function () {
    var offsetX = genBetween(0, headWidth/2);
    // TODO: size, angle?
    return {
      left: {
        x: origin.x + (headWidth/2) - offsetX,
        y: origin.y
      },
      right: {
        x: origin.x + (headWidth/2) + offsetX,
        y: origin.y
      }
    };
  }());

  var eyes = (function () {
    // TODO: y, offsetX, color
    return null;
  }());

  return {
    canvas: {
      height: IMG_HEIGHT,
      width: IMG_WIDTH
    },
    head: {
        origin: origin,
        width: headWidth,
        height: headHeight
    },
    ears: ears,
    eyes: eyes,
    // nose: nose,
    // mouth: mouth
  };
};

module.exports = Fox;
