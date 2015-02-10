'use strict';

var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

// Predictions collection structures the "stops" property of a Trip model.
// Each entry in the "stops" array has properties "id", "eta" and "seconds",
// e.g. `{ id: '70087', eta: 1423524933, seconds: 136 }`.
var PredictionsCollection = Backbone.Collection.extend({});

var Trip = Backbone.Model.extend({
  /**
   * Get the number of seconds until this trip reaches the provided station,
   * or else return -1 if the trip is not scheduled to do so
   *
   * @method visits
   * @return {Number} The number of seconds until this trip reaches the specified station
   * */
  visits: function( stationId ) {
    var station = this.stops().findWhere({
      id: stationId
    });
    return station ? station.get( 'seconds' ) : -1;
  },

  /**
   * Get the message to display for this train for a specific station
   * @method message
   * @return {String} A string message, e.g. "Forest Hills train in 15 minutes"
   */
  messageForStation: function( stationId ) {
    var secondsToStation = this.visits( stationId );

    if ( secondsToStation < 0 ) {
      return '';
    }

    var minutesToStation = Math.floor( secondsToStation / 60 );
    var headsign = this.get( 'headsign' );

    // Return a message to be displayed in the UI
    if ( secondsToStation < 30 ) {
      return headsign + ' train arriving';
    }
    if ( secondsToStation < 90 ) {
      return headsign + ' train approaching';
    }
    return headsign + ' train in ' + minutesToStation + ' minutes';
  },

  /**
   * Identify whether the provided station is this train's next stop
   *
   * @method approaching
   * @param {String} stationId The ID of the station to check for
   * @return {Boolean} Whether that station is this train's next stop
   */
  approaching: function( stationId ) {
    var nextStop = this.stops().first();
    return stationId === nextStop.get( 'id' );
  },

  /**
   * Return a boolean representing whether the trip has a vehicle position,
   * indicating whether it is a trip in motion or an upcoming scheduled trip
   *
   * @method active
   * @return {Boolean} Whether or not the trip is "active"
   */
  active: function() {
    return typeof this.get( 'vehicle' ) !== 'undefined';
  },

  /**
   * Access the "stops" property as a collection
   * @method stops
   * @return {PredictionsCollection} A PredictionsCollection instance containing
   *                                 this trip's predicted arrival times
   */
  stops: function() {
    // Ensure stops are sorted in arrival order
    var stops = _.sortBy( this.get( 'stops' ), 'seq' );
    return new PredictionsCollection( stops );
  },

  /**
   * Access the ETA of the trip as a Date object
   * TODO: Is this useful in any way, given the "seconds" property?
   *
   * @method eta
   * @return {Date} A Date object representing when the train will arrive
   */
  eta: function() {
    return new Date( this.get( 'eta' ) );
  },

  /**
   * Get a representation of the trip's vehicle position, if available
   *
   * @method position
   * @return {Object|null} An object with "lat", "lon" and "bearing", or null
   */
  position: function() {
    var vehicle = this.get( 'vehicle' );
    if ( ! vehicle ) {
      return null;
    }
    return {
      lat: vehicle.get( 'lat' ),
      lon: vehicle.get( 'lon' ),
      bearing: vehicle.get( 'bearing' )
    };
  }
});

module.exports = Trip;
