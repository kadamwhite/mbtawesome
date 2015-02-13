'use strict';

var express = require( 'express' );
var path = require( 'path' );
var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var nunjucks = require( 'nunjucks' );
var stylus = require( 'stylus' );
var browserify = require( 'browserify-middleware' );

var app = express();

var PROD_MODE = process.env.NODE_ENV === 'production';

// view engine setup:
var templateEnv = nunjucks.configure( 'views', {
  autoescape: true,
  express: app
});
require( './views/filters' ).setEnvironment( templateEnv );
templateEnv.addGlobal( 'production', PROD_MODE );

if ( ! PROD_MODE ) {
  // Specify transforms here instead of "browserify" section in package.json,
  // for maximum obviousness
  browserify.settings({
    transform: [
      [ 'nunjucksify', {
        extension: '.tmpl'
      } ]
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
  app.get( '/js/app.js', browserify( './public/js/client-app.js' ) );
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

// development error handler
// will print stacktrace
if ( ! PROD_MODE ) {
  app.use(function( err, req, res, next ) {
    res.status( err.status || 500 );
    res.render( 'error.tmpl', {
      message: err.message,
      error: err,
      __dirname: __dirname
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function( err, req, res, next ) {
  res.status( err.status || 500 );
  res.render( 'error.tmpl', {
    message: err.message,
    error: {
      stack: ''
    }
  });
});

module.exports = app;
