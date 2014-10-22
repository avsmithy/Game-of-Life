define(['grid'], function(Grid) {
  describe("Grid", function() {

    // TODO make dryer
    // e.g. save some common arrays
    // quicker constructor/beforeEach

    describe('constructor', function() {

      it('generates a 2d array', function() {

        var grid = new Grid(50);
        expect(grid.getArray().length).toBe(50);
        expect(grid.getArray()[0].length).toBe(50);
        expect(grid.getArray()[13].length).toBe(50);
        expect(grid.getArray()[49].length).toBe(50);

      });

      it('rejects bad parameters', function() {

        expect(function() {
          new Grid(0); // jshint ignore:line
        }).toThrow();

        expect(function() {
          new Grid(null); // jshint ignore:line
        }).toThrow();

      });

    });

    describe('.getArray', function() {
      it('gets a 2d array', function() {

        var grid = new Grid(3),
            array = grid.getArray();

        expect(array[0]).toEqual([false, false, false]);

      });
    });

    describe('.setArray', function() {
      it('sets the array', function() {

        var grid = new Grid(2),
            arr = [ [true, false],
                    [false, false] ];

        grid.setArray(arr);
        expect(grid.getArray()).toEqual(arr);

      });
    });

    describe('.setCell', function() {
      it('sets a cell', function() {

        var grid = new Grid(2);
        expect(grid.getArray()).toEqual([
          [false, false],
          [false, false]
        ]);

        grid.setCell(0,0)
            .setCell(1,0)
            .setCell(1,1);

        expect(grid.getArray()).toEqual([
          [true, true],
          [false, true]
        ]);

      });
    });

    describe('.cloneArray', function() {
      it('deep clones the array', function() {

        var newArr,
            grid = new Grid(2);

        grid.setCell(0, 0)
            .setCell(1,1);

        // Clone the original grid
        newArr = grid.cloneArray();

        // Modify the clone
        newArr[0][0] = false;
        expect(newArr).toEqual([[false, false],[false, true]]);

        // Expect the original to not be modifed
        expect(grid.getArray()[0][0]).toEqual(true);

      });
    });

    describe('.randomise', function() {

      var countGridValues = function(size, tolerance) {

        var trueCount = 0,
            falseCount = 0,
            gridArray = new Grid(size).randomise(tolerance).getArray(),
            j, k;

        for (j = 0; j < gridArray.length; j++) {
          for (k = 0; k < gridArray[j].length; k++) {
              if (gridArray[j][k] === true) {
                trueCount++;
              } else if (gridArray[j][k] === false) {
                falseCount++;
              }
          }
        }

        return {
          trueCount: trueCount,
          falseCount: falseCount
        };

      };

      it('generates a random boolean grid', function() {

        var count = countGridValues(40, 50);
        // 40^2 = 1600 - Should be close to 1600
        expect(count.trueCount).toBeGreaterThan(700);
        expect(count.trueCount).toBeLessThan(900);
        expect(count.falseCount).toBeGreaterThan(700);
        expect(count.falseCount).toBeLessThan(900);

      });

      it('create false grid if tol = 0', function() {

        var count = countGridValues(40, 0);
        expect(count.trueCount).toBe(0);
        expect(count.falseCount).toBe(1600);

      });

      it('always returns true if tol = 100', function() {

        var count = countGridValues(40, 100);
        expect(count.trueCount).toBe(1600);
        expect(count.falseCount).toBe(0);

      });

      it('rejects invalid parameters', function() {

        var grid = new Grid(50);

        // Out of valid range
        expect(function() {
          grid.randomise(-0.00001);
        }).toThrow();

        expect(function() {
          grid.randomise(101);
        }).toThrow();

        // Just invalid
        expect(function() {
          grid.randomise("123");
        }).toThrow();

      });

    });

    describe('.countAliveNeighbours', function() {
      it('counts number of alive neighbours', function() {

        var grid = new Grid(3),

            // Arrays with number of neighbours
            arr0 = [[false, false, false],
                    [false, true, false],
                    [false, false, false]],

            arr2 = [[true, false, false],
                    [false, true, false],
                    [false, false, true]],

            arr8 = [[true, true, true],
                    [true, true, true],
                    [true, true, true]];

        grid.setArray(arr0);
        expect(grid.countAliveNeighbours(1,1)).toBe(0);

        grid.setArray(arr2);
        expect(grid.countAliveNeighbours(1,1)).toBe(2);

        grid.setArray(arr8);
        expect(grid.countAliveNeighbours(1,1)).toBe(8);

      });
    });

    describe('.step', function() {

      it('kills live cells with less than two alive neighbours (under-population)',
      function() {

        var grid = new Grid(3),
            arr = [ [false, false, false],
                    [false, true, false],
                    [false, false, false]];

        grid.setArray(arr);

        expect(grid.getArray()[1][1]).toBe(true);
        grid.step();
        expect(grid.getArray()[1][1]).toBe(false);

      });

      it('allows cells with two or three living neighbours to survive',
      function() {

        var grid = new Grid(3),
            arr = [ [false, false, false],
                    [false, true, true],
                    [true, false, false]];

        grid.setArray(arr);

        expect(grid.getArray()[1][1]).toBe(true);
        grid.step();
        expect(grid.getArray()[1][1]).toBe(true);

      });

      it('dead cells with 3 live neighbours should become alive (reproduction)',
      function() {

        var grid = new Grid(3),
            arr = [ [false, false, true],
                    [true, false, false],
                    [true, false, false]];

        grid.setArray(arr);

        expect(grid.getArray()[1][1]).toBe(false);
        grid.step();
        expect(grid.getArray()[1][1]).toBe(true);

      });

      it('kills live cells with more than 3 live neighbours (overcrowding)',
      function() {

        var grid = new Grid(3),
            arr = [ [true, false, false],
                    [true, true, false],
                    [true, false, true]];

        grid.setArray(arr);

        expect(grid.getArray()[1][1]).toBe(true);
        grid.step();
        expect(grid.getArray()[1][1]).toBe(false);

      });

    });

  });
});
