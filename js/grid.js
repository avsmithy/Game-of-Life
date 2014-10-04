define([], function() {

  // Constructor for 2d array
  function Grid(size) {

    size = Math.round(size);
    if (typeof size !== 'number' || size < 1) {
      throw 'size must be a number > 0';
    }

    this.array = new Array(size);

    // TODO add context to helpers.each
    for (var i = 0; i < this.array.length; i++) {
      this.array[i] = new Array(size);
    }

    return this;
  }

  Grid.prototype.getArray = function() {
    return this.array;
  };

  Grid.prototype.setArray = function(array) {
    this.array = array;
  };

  // Tolerance is 0-100 value dictating the population size.
  // 0 is all cells dead, 100 is all cells alive.
  // Follows a normal distribution based on Math.random()?
  Grid.prototype.randomise = function(tolerance) {

    // Check valid input
    if (typeof tolerance !== 'number' || tolerance < 0 || tolerance > 100) {
      throw 'tolerance must be a number between 0 and 100';
    }
    tolerance = Math.round(tolerance);

    // Generates boolean from rng and tolerance
    function getBoolean() {
      if ((Math.random() * 100) < tolerance) {
        return true;
      }
      return false;
    }


    // TODO helper to iterate over rows and cells
    var i, j;
    for (i = 0; i < this.array.length; i++) {
      for (j = 0; j < this.array[i].length; j++) {
        this.array[i][j] = getBoolean();
      }
    }

    return this;
  };

  return Grid;
});
