
var chokidar = require('chokidar');

var filesToWatch = ['./mainlayout.js', './layout_functions.js', './layout_prototype.js', './layout_variables.js'];

var watcher = chokidar.watch(filesToWatch, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

var log = console.log.bind(console);

watcher.on('ready', function() {
  log('Watcher is ready...');
});

watcher.on('change', function(path) {
  // regenerate...
  log(path + '...has changed..start regen');
});

//watcher.add(['./mainlayout.js', './layout_functions.js', './layout_prototype.js', './layout_variables.js']);
