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
var MBTApp = window.MBTApp = {};

MBTApp.router = require( './router' );

MBTApp.navigate = function( target ) {
  MBTApp.router.navigate( target, {
    trigger: true
  });
};

Backbone.history.start({
  // silent: true,
  pushState: true
});

// App-wide link hijacking
// $( document ).on( 'click', 'a', function( evt ) {
//   evt.preventDefault();
//   MBTApp.navigate( evt.target.getAttribute( 'href' ) );
// });

module.exports = MBTApp;
