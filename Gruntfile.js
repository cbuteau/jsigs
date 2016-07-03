module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    options: {
      namespace: 'jsigs'
    }
    handlbars: {
      
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');

};
