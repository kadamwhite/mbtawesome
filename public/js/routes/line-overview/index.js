'use strict';

var $ = require( 'jquery' );
var _ = {
  findWhere: require( 'lodash.findwhere' )
};
var analytics = require( '../../lib/analytics' );
var pageTitle = require( '../../../../server/services/page-title' );

var LineOverviewView = require( './line-overview-view' );

var AlertsCollection = require( '../../collections/alerts' );
var TripsCollection = require( '../../collections/trips' );
var LineStatusModel = require( '../../models/line-status' );

var data = require( '../../data' );

module.exports = {
  url: '^/:line(red|orange|blue|green-b|green-c|green-d|green-e)',

  update: function( opts ) {
    this.enter( opts );
  },

  enter: function( opts ) {
    var lineSlug = opts.param.line;
    // Green line data comes in unified blob, so for "green-X" get just "green"
    var shortSlug = lineSlug.split( '-' )[ 0 ];

    // Look up the data with the line slug route parameter
    var line = _.findWhere( data.lines.models, {
      slug: lineSlug
    });

    var trips = data.predictions.get( shortSlug );
    if ( ! trips ) {
      trips = new TripsCollection([], {
        line: shortSlug
      });
      data.predictions.set( shortSlug, trips );
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
        stations: line.stationsFlattened,
        predictions: trips
      });
      data.status.set( lineSlug, status );
    }

    var view = new LineOverviewView({
      alerts: alerts,
      status: status,
      line: line,
      trips: trips
    });
    $( '.container' ).replaceWith( view.el );

    // Kick off trips data request
    alerts.refresh();
    trips.refresh();

    // Set the title: we do this here instead of in a `title` function on
    // the router state object because it uses some of the data above
    this.title = pageTitle([
      line.name + ' Overview'
    ]);

    analytics.pageView();
    window.scrollTo( 0, 0 );
  }
};
