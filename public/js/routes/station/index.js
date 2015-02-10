'use strict';

var StationDetailView = require( './station-detail-view' );

var TripsCollection = require( '../../collections/trips' );

var data = require( '../../data' );
var setTitle = require( '../../lib/set-title' );

function stationDetailRoute( lineSlug, parentStation ) {

  var line = data.lines.bySlug( lineSlug );

  var station = line.station( parentStation );

  var trips = data.predictions.get( lineSlug );
  if ( ! trips ) {
    trips = new TripsCollection([], {
      line: lineSlug
    });
    data.predictions.set( lineSlug, trips );
  }

  new StationDetailView({
    model: line,
    line: lineSlug,
    station: station,
    collection: trips
  });

  // Kick off or refresh the trip predictions data
  trips.fetch();

  setTitle([
    station.name,
    lineSlug + ' Line'
  ]);

}

module.exports = stationDetailRoute;
