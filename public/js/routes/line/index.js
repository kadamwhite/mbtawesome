'use strict';

var StopsListView = require( './station-list-view' );

var AlertsCollection = require( '../../collections/alerts' );
var TripsCollection = require( '../../collections/trips' );
var LineStatusModel = require( '../../models/line-status' );

var data = require( '../../data' );
var setTitle = require( '../../lib/set-title' );

function lineOverviewRoute( lineSlug ) {
  /* jshint validthis: true */

  // Error out early if the route didn't get a valid line slug
  var invalidLineSlug = [ 'red', 'orange', 'blue' ].indexOf( lineSlug ) < 0;

  if ( invalidLineSlug ) {
    return this.error404();
  }

  // Look up the data with the line slug route parameter
  var line = data.lines.bySlug( lineSlug );

  var trips = data.predictions.get( lineSlug );
  if ( ! trips ) {
    trips = new TripsCollection([], {
      line: lineSlug
    });
    data.predictions.set( lineSlug, trips );
  }

  var alerts = data.alerts.get( lineSlug );
  if ( ! alerts ) {
    alerts = new AlertsCollection([], {
      line: lineSlug
    });
    data.alerts.set( lineSlug, alerts );
  }

  var status = data.status.get( lineSlug );
  if ( ! status ) {
    status = new LineStatusModel({
      alerts: alerts,
      stations: line.stops({ flatten: true }),
      predictions: trips
    });
    data.status.set( lineSlug, status );
  }

  new StopsListView({
    alerts: alerts,
    status: status,
    model: line,
    collection: trips
  });

  // Kick off trips data request
  alerts.refresh();
  trips.refresh();

  setTitle([
    lineSlug + ' Line Overview'
  ]);

}

module.exports = lineOverviewRoute;
