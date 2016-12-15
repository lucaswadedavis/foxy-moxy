// TODO: use query params for these
var Chance = require('chance');
var chance = new Chance();

var Fox = function (IMG_WIDTH, IMG_HEIGHT) {

  // head top left corner
  var origin = {x: IMG_WIDTH / 4, y: IMG_HEIGHT / 4};
  // TODO: head headWidth and height
  var headWidth = IMG_WIDTH / 2;
  var headHeight = IMG_HEIGHT / 2;

  var ears = (function () {
    var offsetX = chance.floating({min: 0.1 * headWidth, max: 0.4 * headWidth});
    var angle = chance.floating({min: 0, max: Math.PI / 6});
    // TODO: size
    return {
      left: {
        x: origin.x + (headWidth/2) - offsetX,
        y: origin.y + (0.15 * headHeight),
        angle: angle,
        width: 0.4 * headWidth,
        height: 0.6 * headHeight
      },
      right: {
        x: origin.x + (headWidth/2) + offsetX,
        y: origin.y + (0.15 * headHeight),
        angle: -angle,
        width: 0.4 * headWidth,
        height: 0.6 * headHeight
      }
    };
  }());

  var eyes = (function () {
    // TODO: color
    var offsetY = chance.floating({min: -0.05 * headHeight, max: 0.05 * headHeight});
    var offsetX = chance.floating({min: 0.2 * headWidth, max: 0.25 * headWidth});

    return {
      left: {
        x: origin.x + (headWidth/2) - offsetX,
        y: origin.y + (headHeight/2) + offsetY
      },
      right: {
        x: origin.x + (headWidth/2) + offsetX,
        y: origin.y + (headHeight/2) + offsetY
      }
    }
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
