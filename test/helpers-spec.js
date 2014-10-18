define(['helpers'], function(helpers) {
  describe('Helpers', function() {

    describe('#each', function() {

      it('rejects a wrong object type', function() {
        expect(function() {
          helpers.each('123', function() {});
        }).toThrow();
        expect(function() {
          helpers.each(true, function() {});
        }).toThrow();
      });

      it('loops over an object', function() {
        var obj = {
          a: 1,
          b: 3,
          c: 7
        },
        count = 0,
        string = '';

        helpers.each(obj, function(key, val) {
          count += val;
          string += key;
        });
        expect(count).toBe(11);
        expect(string).toBe('abc');
      });

      it('loops over an array', function() {
        var count = 0,
            arr = [1,2,3,4];
        helpers.each(arr, function(i, val) {
          count += val;
        });
        expect(count).toBe(10);
      });

      it('loops over a nodelist', function() {
        var html =  '<div class="test21">Hello</div>' +
                    '<div class="test21">World</div>',
            string = '',
            qs;

        // Add some dummy html (must be unique on specrunner.html)
        // and get a QSA NodeList
        document.querySelector('body').insertAdjacentHTML('beforeend', html);
        qs = document.querySelectorAll('div.test21');

        helpers.each(qs, function(i, node) {
          string += node.innerHTML;
        });
        expect(string).toBe('HelloWorld');

        // Clean html up from test
        helpers.each(qs, function(i, node) {
          node.parentNode.removeChild(node);
        });
      });

      it('works with context parameter', function() {

        var obj = {string: "HelloWorld"},
            result = "";

        helpers.each(['1'], function() {
          result = this.string;
        }, obj);

        expect(result).toBe("HelloWorld");

      });

      it('can write back to a contextual object', function() {

        var obj = {string: "HelloWorld"};

        helpers.each(['123'], function(i, val) {
          this.string = val;
        }, obj);

        expect(obj.string).toBe("123");

      });

    });

  });
});
