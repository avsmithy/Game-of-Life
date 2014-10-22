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

  // Adds a grid to the page
  exp.makeGrid = function(width, height) {

    height = (typeof height === 'undefined') ? width : height;

    var i, j,
        html = [];

    for (i = 0; i < height; i++) {

      html.push('<div class="row">');

      for (j = 0; j < width; j++) {
        html.push('<div id="x' + j + 'y' + i + '" class="entity"></div>');
      }

      html.push('</div>');
    }

    el.innerHTML = html.join('');
    return this;
  };

  exp.updateGrid = function(array) {

    helpers.each(array, function(y, row) {
      helpers.each(row, function(x, cell) {

        if (cell) {
          el.querySelector('#x' + x + 'y' + y).classList.add('alive');
        } else {
          el.querySelector('#x' + x + 'y' + y).classList.remove('alive');
        }

      });
    });

    return this;
  };

  return exp;
});
