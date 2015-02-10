'use strict';

var StopsListView = require( './view' );

var TripsCollection = require( '../../collections/trips' );

var lines = require( '../../data' ).lines;

function lineOverviewRoute( lineSlug ) {

  var line = lines.bySlug( lineSlug );

  var trips = new TripsCollection([], {
    line: lineSlug
  });

  new StopsListView({
    model: line,
    collection: trips
  });

  // Kick off trips data request
  trips.fetch();

}

module.exports = lineOverviewRoute;
