define(['dom'], function(dom) {
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

    describe('#makeGrid', function() {

      it('makes a blank 2d square grid in the dom', function() {

        dom.createGridContainer().makeGrid(100);
        expect(doc.querySelectorAll('.row').length).toBe(100);
        expect(doc.querySelectorAll('.entity').length).toBe(10000);
        expect(doc.querySelectorAll('.alive').length).toBe(0);

      });

      it('makes a blank 2d rectangle grid in the dom', function() {

        dom.createGridContainer().makeGrid(100, 50);
        expect(doc.querySelectorAll('.row').length).toBe(50);
        expect(doc.querySelectorAll('.entity').length).toBe(5000);
        expect(doc.querySelectorAll('.alive').length).toBe(0);

      });

      it('adds unique ids to each cell', function() {

        dom.createGridContainer().makeGrid(100, 50);

        expect(doc.querySelectorAll('#x0y0').length).toBe(1);
        expect(doc.querySelectorAll('#x1y1').length).toBe(1);

        // Zero indexed
        expect(doc.querySelectorAll('#x100y50').length).toBe(0);

      });

    });

    describe('#updateGrid', function() {

      it('changes the values in the grid', function() {

        dom.createGridContainer().makeGrid(2, 2);

        expect(doc.querySelector('#x0y0').classList.contains('alive')).toBe(false);
        expect(doc.querySelector('#x0y1').classList.contains('alive')).toBe(false);
        expect(doc.querySelector('#x1y0').classList.contains('alive')).toBe(false);
        expect(doc.querySelector('#x1y1').classList.contains('alive')).toBe(false);

        dom.updateGrid([
          [true, true],
          [false, true]
        ]);

        expect(doc.querySelector('#x0y0').classList.contains('alive')).toBe(true);
        expect(doc.querySelector('#x0y1').classList.contains('alive')).toBe(false);
        expect(doc.querySelector('#x1y0').classList.contains('alive')).toBe(true);
        expect(doc.querySelector('#x1y1').classList.contains('alive')).toBe(true);

      });

    });

  });
});
