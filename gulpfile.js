var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
//var rename = require('gulp-rename');
var fs = require('fs');

function readFile(fileName) {
  return fs.readFileSync(fileName, 'utf8');
}

gulp.task('default', function () {
	var templateData = {
    variables: readFile('layout_variables.js'),
    functions: readFile('layout_functions.js'),
    prototype: readFile('layout_prototype.js')
	},
	options = {

		ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
		helpers : {
			capitals : function(str){
				return str.toUpperCase();
			}
		}
	};

	return gulp.src('mainlayout.js')
		.pipe(handlebars(templateData))
//		.pipe(rename('hello.html'))
		.pipe(gulp.dest('jsigs.bigtest.js'));
});
