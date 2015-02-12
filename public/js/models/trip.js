'use strict';

var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

// Predictions collection structures the "stops" property of a Trip model.
// Each entry in the "stops" array has properties "id", "eta" and "seconds",
// e.g. `{ id: '70087', eta: 1423524933, seconds: 136 }`.
var PredictionsCollection = Backbone.Collection.extend({
  // Ensure stops are sorted in arrival order
  comparator: 'seq'
});

var Trip = Backbone.Model.extend({
  /**
   * Return a Boolean indicating whether this trip visits the provided station
   *
   * @method visits
   * @return {Boolean} Whether or not the trip stops at the specified station
   * */
  visits: function( stationId ) {
    return this.secondsToStation( stationId ) > 0;
  },

  /**
   * Get the message to display for this train for a specific station
   * in the station overview list
   *
   * @method messageForStation
   * @return {String} A string message, e.g. "Forest Hills train in 15 minutes"
   */
  messageForStation: function( stationId ) {
    var timeUntil = this.timeUntil( stationId );

    if ( ! timeUntil ) {
      return '';
    }

    var headsign = this.get( 'headsign' );

    if ( timeUntil === 'Arriving' || timeUntil === 'Approaching' ) {
      return headsign + ' train ' + timeUntil;
    }

    return headsign + ' train in ' + timeUntil;
  },

  /**
   * Get an object specifying information about the arrival of the current
   * trip at the specified station (e.g: 'Arriving', '4 minutes', etc)
   *
   * @method timeUntil
   * @param  {String} stationId The station_id of a station on this trip
   * @return {String} A string representing when this trip arrives at the station
   */
  timeUntil: function( stationId ) {
    var secondsToStation = this.secondsToStation( stationId );

    if ( secondsToStation < 0 ) {
      return '';
    }

    if ( secondsToStation < 30 ) {
      return 'Arriving';
    }
    if ( secondsToStation < 90 ) {
      return 'Approaching';
    }
    return Math.floor( secondsToStation / 60 ) + ' min';
  },

  /**
   * Get the number of seconds until this trip reaches the provided station,
   * or else return -1 if the trip is not scheduled to do so
   *
   * @method visits
   * @return {Number} The number of seconds until this trip reaches the specified station
   * */
  secondsToStation: function( stationId ) {
    var station = this.stops().findWhere({
      id: stationId
    });
    return station ? station.get( 'seconds' ) : -1;
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
   *
   * @method stops
   * @return {PredictionsCollection} A PredictionsCollection instance containing
   *                                 this trip's predicted arrival times
   */
  stops: function() {
    return new PredictionsCollection( this.get( 'stops' ) );
  },

  /**
   * Access the ETA of the trip as a Date object
   * (NOT CURRENTLY IN USE)
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
   * (NOT CURRENTLY IN USE)
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
