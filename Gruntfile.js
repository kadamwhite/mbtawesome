var _ = require( 'lodash' );

module.exports = function( grunt ) {
  'use strict';

  // Reusable file globbing
  var files = {
    grunt: [ 'Gruntfile.js' ],
    client: [
      'public/js/**/*.js',
      '!public/js/app.min.js',
      '!public/js/vendor/**/*.js'
    ],
    lib: [
      'app.js',
      'db/**/*.js',
      'models/**/*.js',
      'routes/**/*.js',
      'services/**/*.js',
      'views/**/*.js',
      'www/bin'
    ],
    tests: [ 'tests/**/*.js' ]
  };

  // Reusable JSHintRC options
  var jshintrc = grunt.file.readJSON( '.jshintrc' );

  // Load tasks.
  require( 'load-grunt-tasks' )( grunt );

  grunt.initConfig({

    pkg: grunt.file.readJSON( 'package.json' ),

    browserify: {
      dist: {
        files: {
          'public/js/app.min.js': 'public/js/client-app.js'
        },
        options: {
          browserifyOptions: {
            debug: true
          },
          plugin: [
            [ 'minifyify', {
              map: 'app.min.map',
              output: 'public/js/app.min.map'
            } ]
          ],
          transform: [
            [ 'nunjucksify', {
              extension: '.tmpl'
            } ]
          ]
        }
      }
    },

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
      client: {
        src: files.client
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
      client: {
        options: _.merge({
          browser: true
        }, jshintrc ),
        src: files.client
      },
      tests: {
        options: _.merge({
          globals: {
            beforeEach: false,
            describe: false,
            it: false
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

    stylus: {
      compile: {
        options: {
          banner: [
            '/*! <%= pkg.name %>, v<%= pkg.version %>.',
            'Build by K. Adam White at Bocoup. */'
          ].join( ' ' ),
          compress: true,
          // Give Stylus compiler a root directory for import lookups
          paths: [ 'public/stylus' ]
          // use embedurl( 'test.png' ) in our code to trigger Data URI embedding
          // urlfunc: 'embedurl',
        },
        files: {
          'public/css/app.min.css': 'public/stylus/app.styl'
        }
      }
    },

    watch: {
      lib: {
        files: files.lib,
        tasks: [ 'jscs:lib', 'jshint:lib', 'simplemocha' ]
      },
      client: {
        files: files.client,
        tasks: [ 'jscs:client', 'jshint:client' ]
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
