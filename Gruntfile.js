var _ = require( 'lodash' );

module.exports = function( grunt ) {
  'use strict';

  // Reusable file globbing
  var files = {
    grunt: [ 'Gruntfile.js' ],
    lib: [
      'app.js',
      'services/**/*.js',
      'routes/**/*.js'
    ],
    tests: [ 'tests/**/*.js' ]
  };

  // Reusable JSHintRC options
  var jshintrc = grunt.file.readJSON( '.jshintrc' );

  // Load tasks.
  require( 'load-grunt-tasks' )( grunt );

  grunt.initConfig({

    pkg: grunt.file.readJSON( 'package.json' ),

    jscs: {
      options: {
        config: '.jscsrc',
        reporter: require( 'jscs-stylish' ).path
      },
      grunt: {
        src: files.grunt
      },
      lib: {
        src: files.lib
      },
      tests: {
        src: files.tests
      }
    },

    jshint: {
      options: {
        reporter: require( 'jshint-stylish' )
      },
      grunt: {
        options: jshintrc,
        src: files.grunt
      },
      lib: {
        options: jshintrc,
        src: files.lib
      },
      tests: {
        options: _.merge({
          globals: {
            'beforeEach': false,
            'describe': false,
            'it': false
          }
        }, jshintrc ),
        src: files.tests
      }
    },

    simplemocha: {
      tests: {
        src: files.tests,
        options: {
          reporter: 'nyan'
        }
      }
    },

    watch: {
      lib: {
        files: files.lib,
        tasks: [ 'jscs:lib', 'jshint:lib', 'simplemocha' ]
      },
      tests: {
        files: files.tests,
        tasks: [ 'jscs:tests', 'jshint:tests', 'simplemocha' ]
      }
    }

  });

  grunt.registerTask( 'lint', [ 'jshint', 'jscs' ] );
  grunt.registerTask( 'test', [ 'simplemocha' ] );
  grunt.registerTask( 'default', [ 'lint', 'test' ] );
};
