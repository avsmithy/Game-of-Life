define(['Grid'], function(Grid) {
  describe("Grid", function() {

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

  });
});
