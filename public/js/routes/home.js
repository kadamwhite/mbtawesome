'use strict';

var $ = require( '../deps' ).jQuery;
var tmpl = require( '../../../views/partials/home.nunj' );

function render( routes ) {
  $( '.container' ).html( tmpl.render({
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
    render( routes );
  });
}

module.exports = homeRoute;
