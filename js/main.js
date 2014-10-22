requirejs.config({
  baseUrl: 'js'
});

window.onload = require(['dom', 'grid', 'data/patterns'],
function(dom, Grid, patterns) {

  var grid = patterns.gun(new Grid(100));

  dom.createGridContainer().makeGrid(grid.size);

  var play = function() {
    dom.updateGrid(grid.step().getArray());
    window.setTimeout(play, 10);
  };

  window.setTimeout(play, 0);

});
