// TODO: use query params for these
var gen = require('random-seed');
var IMG_WIDTH = 64;
var IMG_HEIGHT = 64;

// move to helper function
var Point = function (x, y) {
  return {
    x: x,
    y: y
  };
};

var randomFox = (function () {

  // head top left corner
  var origin = Point(IMG_WIDTH / 4, IMG_HEIGHT / 4);
  // head width and height
  var width = IMG_WIDTH / 2;
  var height = IMG_HEIGHT / 2;

  var ears = (function () {
    // TODO: generate stuff
    return {
      left: {
        x: null
      },
      right: {
        x: null
      }
    };
  });

  return {
    ears: ears,
    eyes: eyes,
    nose: nose,
    mouth: mouth
  };
}());
