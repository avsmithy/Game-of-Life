requirejs.config({
  baseUrl: 'js'
});

window.onload = require(['dom', 'Grid'], function(dom, Grid) {

  var grid = new Grid(100).randomise(20);
  dom.createGridContainer().displayGrid(grid);

  var play = function() {
    grid.step();
    dom.displayGrid(grid);
  };

  window.setInterval(play, 50);

});
