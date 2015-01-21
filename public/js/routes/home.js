'use strict';

var $ = require( '../deps' ).jQuery;
var tmplHome = require( '../templates' ).get( 'home' );

function render( routes ) {
  $( '.container' ).html( tmplHome.render({
    title: 'MBTAwesome',
    routes: routes
  }) );
}

function homeRoute() {
  var routes = window.routes;
  if ( routes ) {
    render( routes );
    return;
  }
  $.get( '/api/v1/routes' ).then(function( routes ) {
    window.routes = routes;
    render( routes );
  });
}

module.exports = homeRoute;
