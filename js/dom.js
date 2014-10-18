// This module handles all dom interaction
define(['helpers'], function(helpers) {
  var exp = {},
      gridClass = 'grid',
      el;

  // Create an element to display the game...
  exp.createGridContainer = function() {
    el = document.createElement('div');
    el.className = gridClass;
    document.querySelector('body').appendChild(el);
    return this;
  };

  // Remove all grids
  exp.removeGridContainer = function() {
    var els = document.querySelectorAll('.' + gridClass);
    helpers.each(els, function(i, el) {
      el.parentNode.removeChild(el);
    });
    return this;
  };

  // Takes in a 2d array of truthy/falsy values and displays it
  exp.displayGrid = function(grid) {

    var gridArr = grid.getArray(),
        size = grid.size;

    // Check for square array
    helpers.each(gridArr, function(i, row) {
      if (row.length !== size) {
        throw 'Grid is not a square array';
      }
    });

    // Loop over rows and then items in rows
    var html = [];
    helpers.each(gridArr, function(i, row) {

      html.push('<div class="row">');

      helpers.each(row, function(i, cell) {

        // If value in array is truthy
        if (cell) {
          // Push to html
          html.push('<div class="entity alive"></div>');
        } else {
          html.push('<div class="entity"></div>');
        }
      });

      html.push('</div>');
    });

    // Display in DOM
    el.innerHTML = html.join('');
    return this;
  };

  return exp;
});
