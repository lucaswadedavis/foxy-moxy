// TODO: use query params for these
var gen = require('random-seed');
var IMG_WIDTH = 64;
var IMG_HEIGHT = 64;

// move to helper function
var genBetween = function (min, max) {
  return min + (max - min) * gen();
}

var randomFox = (function () {

  // head top left corner
  var origin = Point(IMG_WIDTH / 4, IMG_HEIGHT / 4);
  // head width and height
  var width = IMG_WIDTH / 2;
  var height = IMG_HEIGHT / 2;

  var ears = (function () {
    var offsetX = genBetween(0, width/2);
    // TODO: size, angle?
    return {
      left: {
        x: origin.x + (width/2) - offsetX,
        y: origin.y
      },
      right: {
        x: origin.x + (width/2) + offsetX,
        y: origin.y
      }
    };
  }());

  var eyes = (function () {
    // TODO: y, offsetX, color
    return {
      
    };
  }());

  return {
    shape: {
        origin: origin,
        width: width,
        height: height
    },
    ears: ears,
    eyes: eyes,
    nose: nose,
    mouth: mouth
  };
}());
