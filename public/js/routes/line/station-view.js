'use strict';

var _ = require( 'lodash' );
var BaseView = require( '../../views/base-view' );

var StationView = BaseView.extend({

  tagName: 'li',

  className: 'station',

  template: require( './station.tmpl' ),

  initialize: function( opts ) {
    this.station = opts.station;
    // line is a Line instance holding the active line
    this.line = opts.line;
    // trips is the TripsCollection instance holding this line's predictions
    this.trips = opts.trips;
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
    var parentStation = this.station.station;
    return this.line.stopsByStation( parentStation );
  },

  /**
   * Get the train models for which this station is their next stop,
   * grouped by which direction they are traveling
   *
   * @method approaching
   * @return {Object} An object, with '0' or '1' properties
   */
  approaching: function() {
    var trips = this.trips;

    var stops = _.pluck( this.station.stops, 'id' );
    // TODO: make and utilize a TripsCollection method to pass in a station
    // object and get back a list of approaching trips
    //
    // Get collection of Trip models for trains approaching this station,
    // grouped by direction name
    // console.log( this.trips.approachingAny( stops ) );
    return _.groupBy( this.trips.approachingAny( stops ), function( trip ) {
      return trip.get( 'direction' );
    });
  },

  serialize: function() {
    var stationIds = _.pluck( this.station.stops, 'id' );

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
      line: this.line.get( 'slug' ),
      station: this.station,
      directions: approachingTrips
    };
  }

});

module.exports = StationView;
