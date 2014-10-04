requirejs.config({
  baseUrl: 'js'
});

window.onload = require(['config', 'dom', 'Grid'],
                function(config, dom, Grid) {

  var grid = new Grid(config.gridSize).randomise(3);
  dom.createGridContainer().displayGrid(grid);

});
