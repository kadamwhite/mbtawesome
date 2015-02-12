'use strict';

var _ = require( 'lodash' );
var StationView = require( '../line/station-view' );

var StopsListView = StationView.extend({

  el: '.container',

  template: require( './station-detail.tmpl' ),

  initialize: function( opts ) {
    // Object containing the details about this station
    this.station = opts.station;

    // this.line is a Line model instance
    this.line = opts.line;

    // this.trips is a TripsCollection instance:
    this.trips = opts.trips;

    // Listen for new predictions data
    this.listenTo( this.trips, 'sync reset', this.render );

    // Auto-render on load
    this.render();
  },

  serialize: function() {
    var stopIds = _.pluck( this.station.stops, 'id' );

    // Get all trips that visit one of this station's stops
    var tripsForStation = this.trips.visitsAny( stopIds );

    // Now that we have the trips, iterate over the stops
    var tripsByDirection = _.chain( this.station.stops )
      // Sort by direction (alphabetically)
      .sortBy( 'dir' )
      // Get all trips visiting this specific stop & direction (filtering on
      // both is necessary due to terminal stations like Alewife or Bowdoin)
      .map(function getsTripsVisiting( stop ) {
        var tripsForStop = _.chain( tripsForStation )
          .filter(function( trip ) {
            return trip.visits( stop.id ) && trip.get( 'direction' ) === stop.dir;
          })
          .map(function createRenderableTrip( trip ) {
            // Use overloaded toJSON to produce a renderable object including
            // relevant computed properties like "active" or "seconds"
            return trip.toJSON( stop.id );
          })
          // Sort the created objects by
          .sortBy( 'seconds' )
          .value();

        // Return a renderable object
        return {
          name: stop.dirName,
          trips: tripsForStop
        };
      })
      .value();

    return {
      station: this.station,
      line: this.line.get( 'slug' ),
      tripsByDirection: tripsByDirection
    };
  }

});

module.exports = StopsListView;
