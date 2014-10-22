/*
  Grid has a 2d array:

  [ [x0y0, x1y0, x2y0],
    [x0y1, x1y1, x2y1],
    [x0y2, x1y2, x2y2] ]

  When looping over this.array:
  this.array[y] is the row.
  this.array[y][x] is the xth cell in row y.

  For logical consistency, to loop over cells, use (TODO refactor this):

  helpers.each(this.array, function(y, row) {
    helpers.each(row, function(x, cell) {
      this.array[y][x] = ...
    }, this);
  }, this);

*/

define(['helpers'], function(helpers) {

  // Constructor for 2d array
  function Grid(size) {

    if (typeof size !== 'number' || size < 1) {
      throw 'size must be a number > 0';
    }

    this.size = Math.round(size);
    this.array = new Array(this.size);

    helpers.each(this.array, function(y) {

      this.array[y] = new Array(this.size);

      helpers.each(this.array[y], function(x) {
        this.array[y][x] = false;
      }, this);

    }, this);

    return this;
  }

  Grid.prototype.getArray = function() {
    return this.array;
  };

  Grid.prototype.setArray = function(array) {
    this.array = array;
    this.size = this.array.length;
    return this;
  };

  Grid.prototype.setCell = function(x, y, value) {
    value = (typeof value === 'undefined') ? true: value;
    this.array[y][x] = (value) ? true : false;
    return this;
  };

  Grid.prototype.cloneArray = function() {
    var newArray = [];

    helpers.each(this.array, function(y, row) {
      newArray[y] = row.slice();
    }, this);

    return newArray;
  };

  // Tolerance is 0-100 value dictating the population size.
  // 0 is all cells dead, 100 is all cells alive.
  // Follows a normal distribution based on Math.random()?
  Grid.prototype.randomise = function(tolerance) {

    // Check valid input
    if (typeof tolerance !== 'number' || tolerance < 0 || tolerance > 100) {
      throw 'tolerance must be a number between 0 and 100';
    }

    // Generates boolean from rng and tolerance
    function getBoolean() {
      if ((Math.random() * 100) < tolerance) {
        return true;
      }
      return false;
    }

    helpers.each(this.array, function(y) {
      helpers.each(this.array[y], function(x) {
        this.array[y][x] = getBoolean();
      }, this);
    }, this);

    return this;
  };

  Grid.prototype.countAliveNeighbours = function(x, y) {

    var alive = 0, i = 0, j = 0,

        // Set limits on loop (don't want to go over edges of grid)

        // Minimum of 0
        xMin = (x - 1 >= 0) ? x - 1 : 0,
        yMin = (y - 1 >= 0) ? y - 1 : 0,

        // Maximum of array length, -1 to correct .length to array index
        xMax = (x + 1 <= this.size - 1) ? x + 1 : (this.size - 1),
        yMax = (y + 1 <= this.size - 1) ? y + 1 : (this.size - 1);

    for (j = yMin; j <= yMax; j++) { // Loop over rows
      for (i = xMin; i <= xMax; i++) { // Loop over cell in rows

        // Don't count cell we are counting neighbours for
        // TODO THIS AND .step do not account for x/y update
        if (!(j === y && i === x) && this.array[j][i]) {
          alive++;
        }
      }
    }

    return alive;
  };

  Grid.prototype.step = function() {

    var newArray = this.cloneArray();

    // Loop over rows and cells
    helpers.each(this.array, function(y, row) {
      helpers.each(row, function(x) {

        // Get number of alive neighbours
        var neighbours = this.countAliveNeighbours(x, y),
            cellAlive = (this.array[y][x]) ? true : false;

        // Underpopulation
        if (neighbours < 2) {

          newArray[y][x] = false;

        // Survive
        } else if (cellAlive && (neighbours === 2 || neighbours === 3)) {

          newArray[y][x] = true;

        // Reproduction
        } else if (!cellAlive && neighbours === 3) {

          newArray[y][x] = true;

        // Overcrowding
        } else if (cellAlive && neighbours > 3) {

          newArray[y][x] = false;

        // Set array to same as previous
        } else {

          newArray[y][x] = this.array[y][x];

        }

      }, this);
    }, this);

    this.setArray(newArray);

    return this;

  };

  return Grid;
});
