'use strict';

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
