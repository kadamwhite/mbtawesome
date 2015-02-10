'use strict';

var _ = require( 'lodash' );
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
   * Get a list of unique stations represented by this view: De-dupe stops on
   * ID to avoid double-listing trains approaching the end-of-line terminal
   * stations (which are included with the same ID in both directions)
   *
   * @method stations
   * @return {Array} Array of station objects
   */
  stations: function() {
    return _.unique( this.station.stops, function( stop ) {
      return stop.id;
    });
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

    return _.chain( this.stations() )
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
    var stationIds = _.pluck( this.stations(), 'id' );

    // Bake the trip objects down to the minimum values needed to render
    var approachingTrips = _.mapValues( this.approaching(), function( trips, key ) {
      return _.map( trips, function( tripModel ) {
        // this.approaching doesn't maintain association b/w the trip and the
        // actual station_id of the station it is approaching: Check each of
        // the station IDs associated with this view to get the message. (only
        // one of them will be valid, hence the .without('').first()).
        var message = _.chain( stationIds )
          .map(function( stationId ) {
            return tripModel.messageForStation( stationId );
          })
          .without( '' )
          .first()
          .value();

        return {
          // Message to display as hover text
          message: message,
          // Return whether the train is scheduled
          scheduled:  ! tripModel.active()
        };
      });
    });

    return {
      station: this.station,
      directions: approachingTrips
    };
  }

});

module.exports = StationView;
