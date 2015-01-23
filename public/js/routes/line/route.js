'use strict';

var StopsListView = require( './view' );

var Stops = require( '../../collections/stops' );

function lineOverviewRoute( line ) {

  var stops = window.stops = new Stops([], {
    line: line
  });

  new StopsListView({
    collection: stops
  });

  stops.fetch();
}

module.exports = lineOverviewRoute;
