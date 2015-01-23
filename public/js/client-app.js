'use strict';

// Configure template renderer
// See "browser" section of package.json: 'nunjucks' is mapped to 'nunjucks-slim'.
// We have to create a Nunjucks environment and save it as nunjucks.env in order
// for the filters in the precompiled templates to be parsed correctly.
var nunjucks = require( 'nunjucks' );
nunjucks.env = new nunjucks.Environment();
require( '../../views/filters' ).setEnvironment( nunjucks.env );

var Backbone = require( './deps' ).Backbone;
var $ = require( './deps' ).jQuery;

// Namespace
var MBTApp = {};

MBTApp.router = require( './routes' );

Backbone.history.start({
  pushState: true,
  silent: true
});

// App-wide link hijacking
$( document ).on( 'click', 'a', function( evt ) {
  evt.preventDefault();
  MBTApp.router.navigate( evt.target.getAttribute( 'href' ), {
    trigger: true
  });
});

module.exports = MBTApp;
