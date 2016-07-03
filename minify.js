
var fs = require('fs');
var uglify = require('uglify-js');

var uglified = uglify.minify(['jsigs.js']);

var package = require('./package.json');

var fileName = 'jsigs.' + package.version + '.min.js';

fs.writeFile(fileName, uglified.code, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("Script generated and saved:", fileName);
  }
});
