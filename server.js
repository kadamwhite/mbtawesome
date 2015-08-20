'use strict';

var express = require( 'express' );
var path = require( 'path' );
var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var combynExpress = require( 'combynexpress' );
var stylus = require( 'stylus' );
var browserify = require( 'browserify-middleware' );

var app = express();

var PROD_MODE = process.env.NODE_ENV === 'production';

// view engine setup:
app.engine( 'html', combynExpress() );
app.set( 'view engine', 'html' );

// Environment-specific template configuration
combynExpress.registerFilter( 'if-prod', function( str ) {
  return PROD_MODE ? str : '';
});

// Analytics template setup
var config = require( './server/lib/config' );

// Defined as a filter so it can be used for conditionals and for output
combynExpress.registerFilter( 'tracking-id', function() {
  return config.analytics && config.analytics.trackingId;
});

if ( ! PROD_MODE ) {
  // Specify transforms here instead of "browserify" section in package.json,
  // for maximum obviousness
  browserify.settings({
    transform: [
      [ 'combynify' ]
    ]
  });

  // Support stylus
  app.use( stylus.middleware({
    src: path.join( __dirname, 'public/stylus' ),
    dest: path.join( __dirname, 'public/css' ),
    compile: function compileStylus( str, path ) {
      return stylus( str )
        .set( 'filename', path )
        // .set( 'sourcemap', true )
        .set( 'compress', true );
    }
  }) );

  // Bundle and serve first-party application code
  app.get( '/js/app.js', browserify( './public/js/client.js', {
    debug: true
  }));
}

// Other middleware & static assets
app.use( favicon( __dirname + '/public/favicon.png' ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( cookieParser() );

// Serve static assets
app.use( express.static( path.join( __dirname, 'public' ) ) );

// MBTAwesome API v1; MBTA API v2. Confusing? Natch.
app.use( '/api/v1/', require( './server/routes/api' ) );

// Publicly-accessible routes
app.use( '/', require( './server/routes' ) );

// error handlers

if ( ! PROD_MODE ) {
  // development error handler
  // will print stacktrace
  app.use(function( err, req, res, next ) {
    res.status( err.status || 500 );
    res.render( 'error', {
      message: err.message,
      error: err,
      __dirname: __dirname
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function( err, req, res, next ) {
    res.status( err.status || 500 );
    res.render( 'error', {
      message: err.message,
      error: {
        stack: ''
      }
    });
  });
}

module.exports = app;
