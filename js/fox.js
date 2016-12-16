// TODO: use query params for these
var Chance = require('chance');
var chance = new Chance();

var hsl = function (h, s, l) {
  return "hsl(" + h + "," + s + "%, " + l + "%)";
}

var Fox = function (IMG_WIDTH, IMG_HEIGHT) {

  // head top left corner
  var origin = {x: IMG_WIDTH / 4, y: IMG_HEIGHT / 4};
  // TODO: head headWidth and height
  var headWidth = IMG_WIDTH / 2;
  var headHeight = IMG_HEIGHT / 2;
  var kappa = chance.floating({min: 0.2, max: 0.45})

  var hue = chance.integer({min: 5, max: 55});
  var saturation = chance.integer({min: 70, max: 90});
  var lightness = chance.integer({min: 40, max: 60});
  var headColor = hsl(hue, saturation, lightness);

  var ears = (function () {
    var offsetX = chance.floating({min: 0.1 * headWidth, max: 0.4 * headWidth});
    var angle = chance.floating({min: 0, max: 0.2 * Math.PI});
    // TODO: size
    return {
      color: headColor,
      kappa: kappa,
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
    var offsetX = chance.floating({min: 0.13 * headWidth, max: 0.25 * headWidth});

    return {
      height: 0.1 * headHeight,
      width: 0.05 * headWidth,
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

  var nose = (function (eyes) {
    return {
      x: origin.x + (headWidth/2),
      y: (eyes.left.y + 0.3 * (origin.y + headHeight - eyes.left.y)),
      width: 0.05 * headWidth,
      height: 0.05 * headHeight
    }
  }(eyes));

  return {
    canvas: {
      height: IMG_HEIGHT,
      width: IMG_WIDTH,
      color: hsl(
        chance.integer({min:120, max:320}),
        chance.integer({min:50, max:60}),
        chance.integer({min:30, max:50})
      )
    },
    head: {
        origin: origin,
        width: headWidth,
        height: headHeight,
        color: headColor,
        kappa: kappa,
        maskColor: hsl(hue, saturation, 95)
    },
    ears: ears,
    eyes: eyes,
    nose: nose,
    // mouth: mouth
  };
};

module.exports = Fox;
