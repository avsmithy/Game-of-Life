requirejs.config({
  baseUrl: 'js'
});

window.onload = require(['dom', 'grid', 'data/patterns'],
function(dom, Grid, patterns) {

  var grid = patterns.gun(new Grid(100));

  dom.createGridContainer().displayGrid(grid);

  var play = function() {
    dom.displayGrid(grid.step());
  };

  window.setInterval(play, 50);

});
