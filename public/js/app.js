// We do not currently bundle the third-party scripts together with
// our first-party code: they are loaded with their own script tags
/* global Backbone:false */
/* global jQuery:false */
/* global _:false */
'use strict';

// Namespace
var MBTApp = {};

var $ = jQuery;

console.log( typeof $, typeof Backbone, typeof _ );

MBTApp.router = require( './routes' );

Backbone.history.start({ pushState: true });

// App-wide link hijacking
$( document ).on( 'click', 'a', function( evt ) {
  evt.preventDefault();
  MBTApp.router.navigate( evt.target.getAttribute( 'href' ), {
    trigger: true
  });
});

module.exports = MBTApp;
