'use strict';

var StationDetailView = require( './station-detail-view' );

var TripsCollection = require( '../../collections/trips' );

var data = require( '../../data' );
var setTitle = require( '../../lib/set-title' );

function stationDetailRoute( lineSlug, parentStation ) {
  /* jshint validthis: true */

  // Error out early if the route didn't get a valid line slug
  var invalidLineSlug = [ 'red', 'orange', 'blue' ].indexOf( lineSlug ) < 0;

  if ( invalidLineSlug ) {
    return this.error404();
  }

  // Look up the data with the line slug route parameter
  var line = data.lines.bySlug( lineSlug );

  var station = line.station( parentStation );

  if ( ! station ) {
    return this.error404();
  }

  var trips = data.predictions.get( lineSlug );
  if ( ! trips ) {
    trips = new TripsCollection([], {
      line: lineSlug
    });
    data.predictions.set( lineSlug, trips );
  }

  new StationDetailView({
    line: line,
    station: station,
    trips: trips
  });

  // Kick off or refresh the trip predictions data
  trips.refresh();

  setTitle([
    station.name,
    lineSlug + ' Line'
  ]);

}

module.exports = stationDetailRoute;
