'use strict';

var $ = require( '../deps' ).jQuery;
var tmpl = require( '../../../views/partials/line-overview.nunj' );

function render( context ) {
  var html = tmpl.render( context );
  $( '.container' ).html( html );
}

function lineOverviewRoute( line ) {
  var title = $.getJSON( '/api/v1/routes/' + line ).then(function( routes ) {
    return routes.name;
  });

  var stops = $.getJSON( '/api/v1/routes/' + line + '/stops' ).then(function( stops ) {
    return stops;
  });

  $.when( title, stops ).then(function( title, stops ) {
    render({
      title: title + ' Overview',
      stops: stops
    });
  });
}

module.exports = lineOverviewRoute;
