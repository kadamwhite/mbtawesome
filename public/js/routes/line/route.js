'use strict';

var StopsListView = require( './view' );

var Line = require( '../../models/line' );
var TripsCollection = require( '../../collections/trips' );

function lineOverviewRoute( lineSlug ) {

  var lineObj = require( '../../data' ).lines[ lineSlug ];

  var line = new Line( lineObj );

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
