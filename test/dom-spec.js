define(['dom', 'Grid'], function(dom, Grid) {
  describe('Dom', function() {

    var doc = document;

    beforeEach(function() {
      dom.removeGridContainer();
    });

    it('#createGridContainer creates element with class "grid"', function() {
      expect(doc.querySelector('.grid')).toBe(null);
      dom.createGridContainer();
      expect(doc.querySelector('.grid')).not.toBe(null);
    });

    it('#removeGridContainer removes all .grid elements', function() {

      // Create some dummy .grid elements and add to body
      var html = '<div class="grid"></div><div class="grid"></div>';
      doc.querySelector('body').insertAdjacentHTML('beforeend', html);

      expect(doc.querySelector('.grid')).not.toBe(null);
      dom.removeGridContainer();
      expect(doc.querySelector('.grid')).toBe(null);
    });

    describe('#displayGrid', function() {

      it('rejects non-square arrays', function() {

        var grid = new Grid(3);

        var arr = [
                    [false, false, false],
                    [true, false, true, true],
                    [false, true, true]
                  ];
        grid.setArray(arr);

        expect(function() {
          dom.displayGrid(grid);
        }).toThrow();

        arr = [
                [false, false],
                [true, true],
                [false, true]
              ];
        grid.setArray(arr);

        expect(function() {
          dom.displayGrid(grid);
        }).toThrow();

      });

      it('takes a truthy/falsy 2d array and display it', function() {

        var checkAlive = function(el) {
          for (var i = 0; i < el.classList.length; i++) {
            if (el.classList[i] === 'alive') {
              return true;
            }
          }
          return false;
        };

        var arr = [ [false, false, false],
                    [true, false, true],
                    [false, true, true]];

        var grid = new Grid(3);
        grid.setArray(arr);
        dom.createGridContainer().displayGrid(grid);

        var rows = doc.querySelectorAll('.row');
        expect(rows.length).toBe(3);
        expect(checkAlive(rows[0].firstChild)).toBe(false);
        expect(checkAlive(rows[0].lastChild)).toBe(false);
        expect(checkAlive(rows[1].firstChild)).toBe(true);
        expect(checkAlive(rows[1].lastChild)).toBe(true);
        expect(checkAlive(rows[2].firstChild)).toBe(false);
        expect(checkAlive(rows[2].lastChild)).toBe(true);

      });

    });

  });
});
