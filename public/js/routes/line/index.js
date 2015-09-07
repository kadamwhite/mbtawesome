'use strict';

var analytics = require( '../../lib/analytics' );
var pageTitle = require( '../../../../server/services/page-title' );

var StopsListView = require( './station-list-view' );

var AlertsCollection = require( '../../collections/alerts' );
var TripsCollection = require( '../../collections/trips' );
var LineStatusModel = require( '../../models/line-status' );

var data = require( '../../data' );

module.exports = {
  url: '^/:line(red|orange|blue)',

  update: function( opts ) {
    this.enter( opts );
  },

  enter: function( opts ) {
    var lineSlug = opts.param.line;

    // Look up the data with the line slug route parameter
    var line = data.lines.findWhere({
      slug: lineSlug
    });

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
        stations: line.stopsFlattened,
        predictions: trips
      });
      data.status.set( lineSlug, status );
    }

    new StopsListView({
      alerts: alerts,
      status: status,
      line: line,
      collection: trips
    });

    // Kick off trips data request
    alerts.refresh();
    trips.refresh();

    // Set the title: we do this here instead of in a `title` function on
    // the router state object because it uses some of the data above
    this.title = pageTitle([
      lineSlug + ' Line'
    ]);

    analytics.pageView();
  }
};
