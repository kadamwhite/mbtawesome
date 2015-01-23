'use strict';

var $ = require( '../../deps' ).jQuery;
var Backbone = require( '../../deps' ).Backbone;

var StopsListView = require( './view' );

var Stops = require( '../../collections/stops' );

function lineOverviewRoute( line ) {

  var stops = window.stops = new Stops([], {
    line: line
  });

  var stopsList = new StopsListView({
    collection: stops
  });

  stops.fetch();
}

module.exports = lineOverviewRoute;
