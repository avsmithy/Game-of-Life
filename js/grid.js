define(['helpers'], function(helpers) {

  // Constructor for 2d array
  function Grid(size) {

    if (typeof size !== 'number' || size < 1) {
      throw 'size must be a number > 0';
    }

    this.size = Math.round(size);
    this.array = new Array(this.size);

    helpers.each(this.array, function(x) {

      // TODO use function(i, row) { row = ...} ?
      // Like line 34. Copying object not reference to it?
      this.array[x] = new Array(this.size);

      // ES6 .fill()...
      helpers.each(this.array[x], function(y) {
        this.array[x][y] = false;
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
    this.array[x][y] = (value) ? true : false;
    return this;
  };

  Grid.prototype.cloneArray = function() {
    var newArray = [];

    helpers.each(this.array, function(x, row) {
      newArray[x] = row.slice();
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

    helpers.each(this.array, function(x) {
      helpers.each(this.array[x], function(y) {
        this.array[x][y] = getBoolean();
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

    for (i = xMin; i <= xMax; i++) {
      for (j = yMin; j <= yMax; j++) {

        // Don't count cell we are counting neighbours for
        if (!(i === x && j === y) && this.array[i][j]) {
          alive++;
        }
      }
    }

    return alive;
  };

  Grid.prototype.step = function() {

    var newArray = this.cloneArray();

    // Loop over rows and cells
    helpers.each(this.array, function(x) {
      helpers.each(this.array[x], function(y) {

        // Get number of alive neighbours
        var neighbours = this.countAliveNeighbours(x, y),
            cellAlive = (this.array[x][y]) ? true : false;

        // Underpopulation
        if (neighbours < 2) {

          newArray[x][y] = false;

        // Survive
        } else if (cellAlive && (neighbours === 2 || neighbours === 3)) {

          newArray[x][y] = true;

        // Reproduction
        } else if (!cellAlive && neighbours === 3) {

          newArray[x][y] = true;

        // Overcrowding
        } else if (cellAlive && neighbours > 3) {

          newArray[x][y] = false;

        // Set array to same as previous
        } else {

          newArray[x][y] = this.array[x][y];

        }

      }, this);
    }, this);

    this.setArray(newArray);

    // TODO returns an object of changes to the grid,
    // use that to mutate rather than redraw

    return this;

  };

  return Grid;
});
