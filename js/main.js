requirejs.config({
  baseUrl: 'js'
});

window.onload = require(['dom', 'Grid'],
                function(dom, Grid) {

  var grid = new Grid(100).randomise(3);
  dom.createGridContainer().displayGrid(grid);

});
