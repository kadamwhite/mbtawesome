'use strict';

var $ = require( '../deps' ).jQuery;
var tmplLineOverview = require( '../templates' ).get( 'line-overview' );

function render( line ) {
  $( '.container' ).html( tmplLineOverview.render({
    title: line.name + ' Overview'
  }) );
}

function lineOverviewRoute( line ) {
  var routes = window.routes;

  if ( routes ) {
    render( routes[ line ] );
    return;
  }

  $.get( '/api/v1/routes' ).then(function( routes ) {
    window.routes = routes;
    render( routes[ line ] );
  });
}

module.exports = lineOverviewRoute;
