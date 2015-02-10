'use strict';

var StopsListView = require( './view' );

var TripsCollection = require( '../../collections/trips' );

var data = require( '../../data' );

function lineOverviewRoute( lineSlug ) {

  var line = data.lines.bySlug( lineSlug );

  var trips = data.predictions.get( lineSlug );
  if ( ! trips ) {
    trips = new TripsCollection([], {
      line: lineSlug
    });
    data.predictions.set( lineSlug, trips );
  }

  new StopsListView({
    model: line,
    collection: trips
  });

  // Kick off trips data request
  trips.fetch();

}

module.exports = lineOverviewRoute;
