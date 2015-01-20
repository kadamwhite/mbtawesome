'use strict';

var express = require( 'express' );
var path = require( 'path' );
var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var nunjucks = require( 'nunjucks' );
var stylus = require( 'stylus' );

var routes = require( './routes/index' );
var users = require( './routes/users' );

var app = express();

// view engine setup
var templateEnv = nunjucks.configure( 'views', {
  autoescape: true,
  express: app
});
require( './views/filters' ).setEnvironment( templateEnv );

// Support stylus & serve static assets
function compileStylus( str, path ) {
  return stylus( str )
    .set( 'filename', path )
    // .set( 'sourcemap', true )
    .set( 'compress', true );
}

app.use( stylus.middleware({
  src: path.join( __dirname, 'public/stylus' ),
  dest: path.join( __dirname, 'public/css' ),
  compile: compileStylus
}) );

// Other middleware & static assets
app.use( favicon( __dirname + '/public/favicon.png' ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/', routes );
app.use( '/users', users );

// catch 404 and forward to error handler
app.use(function( req, res, next ) {
  var err = new Error( 'Not Found' );
  err.status = 404;
  next( err );
});

// error handlers

// development error handler
// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
  app.use(function( err, req, res, next ) {
    res.status( err.status || 500 );
    res.render( 'error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function( err, req, res, next ) {
  res.status( err.status || 500 );
  res.render( 'error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
