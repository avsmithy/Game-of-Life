// Used for premade GoL pattern/scenarios
// Pass a grid object to the function to set

define([], function() {
  var exp = {};

  exp.glider = function(grid) {

    grid
    .setCell(0,1)
    .setCell(1,2)
    .setCell(2,0)
    .setCell(2,1)
    .setCell(2,2);

    return grid;
  };

  exp.gun = function(grid) {

    grid
    .setCell(1,5)
    .setCell(1,6)
    .setCell(2,5)
    .setCell(2,6)

    .setCell(35,3)
    .setCell(35,4)
    .setCell(36,3)
    .setCell(36,4)

    .setCell(11,5)
    .setCell(11,6)
    .setCell(11,7)
    .setCell(12,4)
    .setCell(12,8)
    .setCell(13,3)
    .setCell(13,9)
    .setCell(14,3)
    .setCell(14,9)
    .setCell(15,6)
    .setCell(16,4)
    .setCell(16,8)
    .setCell(17,5)
    .setCell(17,6)
    .setCell(17,7)
    .setCell(18,6)

    .setCell(21,3)
    .setCell(21,4)
    .setCell(21,5)
    .setCell(22,3)
    .setCell(22,4)
    .setCell(22,5)

    .setCell(23,2)
    .setCell(23,6)

    .setCell(25,1)
    .setCell(25,2)
    .setCell(25,6)
    .setCell(25,7);

    return grid;
  }

  exp.default = function(grid) {

    grid
    .setCell(1,5)
    .setCell(1,6)
    .setCell(2,5)
    .setCell(2,6)
    .setCell(5,3)
    .setCell(5,4)
    .setCell(6,3)
    .setCell(6,4)

    .setCell(1,5)
    .setCell(1,6)
    .setCell(1,7)
    .setCell(2,4)
    .setCell(2,8)
    .setCell(3,3)
    .setCell(3,9)
    .setCell(4,3)
    .setCell(4,9)
    .setCell(5,6)
    .setCell(6,4)
    .setCell(6,8)
    .setCell(7,5)
    .setCell(7,6)
    .setCell(7,7)
    .setCell(8,6)

    .setCell(1,3)
    .setCell(1,4)
    .setCell(1,5)
    .setCell(2,3)
    .setCell(2,4)
    .setCell(2,5)

    .setCell(3,2)
    .setCell(3,6)

    .setCell(5,1)
    .setCell(5,2)
    .setCell(5,6)
    .setCell(5,7);

    return grid;
  }

  return exp;
});
