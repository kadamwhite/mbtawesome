'use strict';

var BaseView = require( '../../views/base-view' );

var StationView = BaseView.extend({

  tagName: 'li',

  className: 'station',

  template: require( './station.nunj' ),

  initialize: function( opts ) {
    this.station = opts.station;

    // Probably not needed?
    // this.listenTo( this.collection, 'add sync reset', this.render );
  },

  /**
   * Get the train models for which this station is their next stop,
   * grouped by which direction they are traveling
   *
   * @method approaching
   * @return {Object} An object, with '0' or '1' properties
   */
  approaching: function() {
    var trips = this.collection;

    // De-dupe stops on ID to avoid double-listing trains approaching the
    // end-of-line terminal stations (which get listed for both directions)
    var stops = _.unique( this.station.stops, function( stop ) {
      return stop.id;
    });

    return _.chain( stops )
      // Get collection of Trip models for trains approaching this station
      .map(function( stop ) {
        return trips.approaching( stop.id );
      })
      // Flatten results
      .flatten()
      // Throw out any empty arrays
      .reject(function( trips ) {
        return trips.length === 0;
      })
      // Group by direction (0 or 1)
      .groupBy(function( trip ) {
        return trip.get( 'direction' );
      })
      .value();
  },

  serialize: function() {
    // Bake the trip objects down to the minimum values needed to render
    var approachingTrips = _.mapValues( this.approaching(), function( trips, key ) {
      return _.map( trips, function( tripModel ) {
        var headsign = tripModel.get( 'headsign' );
        var seconds = tripModel.stops().first().get( 'seconds' );
        var minutes = Math.floor( seconds / 60 );
        var trip = {};

        // Return a message to be displayed in the UI
        if ( minutes < 1 ) {
          trip.message = headsign + ' train arriving';
        } else if ( minutes === 1 ) {
          trip.message = headsign + ' train approaching';
        } else {
          trip.message = headsign + ' train in ' + minutes + ' minutes';
        }

        // Return whether the train is scheduled
        trip.scheduled = ! tripModel.active();

        return trip;
      });
    });

    return {
      station: this.station,
      directions: approachingTrips
    };
  }

});

module.exports = StationView;
