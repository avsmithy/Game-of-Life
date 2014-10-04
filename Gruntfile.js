/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      js: {
        src: 'js/*.js'
      },
      test: {
        src: 'test/**/*spec.js'
      }
    },

    jasmine: {
      js: {
        src: '<%= jshint.js.src %>',
        options: {
          keepRunner: true,
          specs: '<%= jshint.test.src %>',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: 'js/main.js'
          }
        }
      }
    },

    // TODO run jshint first and only on changed file jshint + spec
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: '<%= jshint.js.src %>',
        tasks: ['jasmine', 'jshint:js']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jasmine', 'jshint:test']
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['watch']);

};
