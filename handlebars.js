
var handlebars = require('handlebars');

var fs = require('fs');

function readFile(fileName) {
  return fs.readFileSync(fileName, 'utf8');
}

var dataSig = {
  variables: readFile('layout_variables.js'),
  functions: readFile('layout_functions.js'),
  prototype: readFile('layout_prototype.js')
};

// handlebars.registerHelper('variables', function(text, url) {
//   text = handlebars.Utils.escapeExpression(text);
//   return new handlebars.SafeString(text);
// });

fs.readFile('mainlayout.js', 'utf-8', function(error, source) {
  //var template = handlebars.precompile(source, { noEscape: true });
  var template = handlebars.compile(source);
  var final = template(dataSig);
  fs.writeFile('jsigs.js', final, function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('File was written');
    }

  });
});
//var template = fs.readFileSync('mainlayout.js', 'utf8' );
//handlbars.compile()
