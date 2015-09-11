'use strict';

var $ = require( 'jquery' );
var analytics = require( '../../lib/analytics' );
var pageTitle = require( '../../../../server/services/page-title' );

var StationDetailView = require( './station-detail-view' );

var TripsCollection = require( '../../collections/trips' );

var data = require( '../../data' );

module.exports = {
  url: '^/:line(red|orange|blue)/:station',

  update: function( opts ) {
    this.enter( opts );
  },

  enter: function( opts ) {
    /* jshint validthis: true */
    var lineSlug = opts.param.line;
    var parentStation = opts.param.station;

    // Look up the data with the line slug route parameter
    var line = data.lines.findWhere({
      slug: lineSlug
    });

    var station = line.station( parentStation );

    if ( ! station ) {
      // Trigger 404 if the provided station isn't in our data
      return this.parent.go( '$notfound', {
        encode: false
      });
    }

    var trips = data.predictions.get( lineSlug );
    if ( ! trips ) {
      trips = new TripsCollection([], {
        line: lineSlug
      });
      data.predictions.set( lineSlug, trips );
    }

    var view = new StationDetailView({
      line: line,
      station: station,
      trips: trips
    });
    $( '.container' ).replaceWith( view.el );

    // Kick off or refresh the trip predictions data
    trips.refresh();

    // Set the title: we do this here instead of in a `title` function on
    // the router state object because it uses some of the data above
    this.title = pageTitle([
      station.name,
      lineSlug + ' Line'
    ]);

    analytics.pageView();
  }
};
