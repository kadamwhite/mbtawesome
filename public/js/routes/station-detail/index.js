'use strict';

var $ = require( 'jquery' );
var _ = {
  findWhere: require( 'lodash.findwhere' )
};
var analytics = require( '../../lib/analytics' );
var pageTitle = require( '../../../../server/services/page-title' );

var StationDetailView = require( './station-detail-view' );

var TripsCollection = require( '../../collections/trips' );

var data = require( '../../data' );

module.exports = {
  url: '^/:line(red|orange|blue|green-b|green-c|green-d|green-e)/:station',

  update: function( opts ) {
    this.enter( opts );
  },

  enter: function( opts ) {
    /* jshint validthis: true */
    var lineSlug = opts.param.line;
    // Green line data comes in unified blob, so for "green-X" get just "green"
    var shortSlug = lineSlug.split( '-' )[ 0 ];
    var parentStation = opts.param.station;

    // Look up the data with the line slug route parameter
    var line = _.findWhere( data.lines.models, {
      slug: lineSlug
    });

    var station = line.station( parentStation );

    if ( ! station ) {
      // Trigger 404 if the provided station isn't in our data
      return this.parent.go( '$notfound', {
        encode: false
      });
    }

    // Green line data comes in unified blob, so for "green-X" get just "green"
    var trips = data.predictions.get( shortSlug );
    if ( ! trips ) {
      trips = new TripsCollection([], {
        line: shortSlug
      });
      data.predictions.set( shortSlug, trips );
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
    window.scrollTo( 0, 0 );
  }
};
