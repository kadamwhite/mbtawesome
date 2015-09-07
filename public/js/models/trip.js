'use strict';

var _ = require( 'lodash' );
var Model = require( 'ampersand-model' );
var Collection = require( 'ampersand-rest-collection' );

// Predictions collection structures the "stops" property of a Trip model.
// Each entry in the "stops" array has properties "id", "eta" and "seconds",
// e.g. `{ id: '70087', eta: 1423524933, seconds: 136 }`.
var PredictionsCollection = Collection.extend({
  // Use no model for this data: raw JS objects
  // TODO: Define a model that takes id, seq, eta & seconds props
  // Ensure stops are sorted in arrival order
  comparator: 'seq'
});

var Trip = Model.extend({

  props: {
    /**
     * @property {Number} direction GTFS direction identifier (1 or 0)
     */
    direction: 'number',

    /**
     * @property {String} headsign The human-readable destination of this trip
     */
    headsign: 'string',

    /**
     * @property {String} id Unique ID for this trip
     */
    id: 'string',

    /**
     * @property {Object} vehicle An object describing the trip's vehicular position
     */
    vehicle: 'object'
  },

  children: {
    /**
     * A PredictionsCollection instance containing this trip's predicted arrival times
     * @property {PredictionsCollection} stops
     */
    stops: PredictionsCollection
  },

  derived: {
    /**
     * Boolean representation of whether the trip has a vehicle position, indicating whether it
     * is a trip in motion (and therefore a reliable prediction) or an upcoming (scheduled) trip
     *
     * @property {Boolean} active
     */
    active: {
      deps: [ 'vehicle' ],
      fn: function() {
        return ! ! this.vehicle;
      }
    },

    /**
     * @property {Boolean} scheduled The inverse of "active"
     */
    scheduled: {
      deps: [ 'active' ],
      fn: function() {
        return ! this.active;
      }
    }
  },

  /**
   * Return a Boolean indicating whether this trip visits the provided station
   *
   * @method visits
   * @return {Boolean} Whether or not the trip stops at the specified station
   * */
  visits: function( stopId ) {
    return this.secondsToStop( stopId ) > 0;
  },

  /**
   * Get the message to display for this train for a specific station
   * in the station overview list
   *
   * @method messageForStation
   * @return {String} A string message, e.g. "Forest Hills train in 15 minutes"
   */
  messageForStation: function( stopId ) {
    var timeUntil = this.timeUntil( stopId ).toLowerCase();

    if ( ! timeUntil ) {
      return '';
    }

    if ( timeUntil === 'arriving' || timeUntil === 'approaching' ) {
      return this.headsign + ' train ' + timeUntil;
    }

    return this.headsign + ' train in ' + timeUntil;
  },

  /**
   * Get an object specifying information about the arrival of the current
   * trip at the specified station (e.g: 'Arriving', '4 minutes', etc)
   *
   * @method timeUntil
   * @param  {String} stopId The station_id of a station on this trip
   * @return {String} A string representing when this trip arrives at the station
   */
  timeUntil: function( stopId ) {
    var secondsToStop = this.secondsToStop( stopId );

    if ( secondsToStop < 0 ) {
      return '';
    }

    if ( secondsToStop < 30 ) {
      return 'Arriving';
    }
    if ( secondsToStop < 90 ) {
      return 'Approaching';
    }
    return Math.floor( secondsToStop / 60 ) + ' min';
  },

  /**
   * Get the number of seconds until this trip reaches the provided station,
   * or else return -1 if the trip is not scheduled to do so
   *
   * @method visits
   * @return {Number} The number of seconds until this trip reaches the specified station
   * */
  secondsToStop: function( stopId ) {
    var station = this.stops.findWhere({
      id: stopId
    });
    return station ? station.seconds : -1;
  },

  /**
   * Get the lowest secondsToStop for the provided station IDs
   *
   * Example: If two stop_ids "1" and "2" exist within a parent station,
   * `secondsToAny([ "1", "2" ])` will return the secondsToStop for either
   * "1" or "2" (trips only hit one stop within a station, by direction)
   *
   * @method secondsToAny
   * @param  {Array}  stopIds An array of stop_id strings
   * @
   * @return {Number} The soonest this trip will reach any provided stop
   */
  secondsToAny: function( stopIds ) {
    var thisTrip = this;
    return _.chain( stopIds )
      // De-dupe to handle line-terminal stations like Alewife
      .unique()
      // Get the secondsToStop for each provided stop_id
      .map(function( stopId ) {
        return thisTrip.secondsToStop( stopId );
      })
      // Remove stops that this trip won't be visiting
      .without( -1 )
      // sort from low to high
      .sort()
      // get the lowest
      .first()
      .value();
  },

  /**
   * Identify whether the provided station is this train's next stop
   *
   * @method approaching
   * @param {String} stopId The ID of the station to check for
   * @return {Boolean} Whether that station is this train's next stop
   */
  approaching: function( stopId ) {
    var nextStop = this.stops.first();
    return stopId === nextStop.id;
  },

  /**
   * Extend toJSON to include some of the computed properties: if a stopId is
   * provided, "timeUntil", "seconds" and "stop" will all be included
   *
   * Note: this feels janky, toJSON (a) isn't really intended for this and
   * (b) doesn't usually take an argument in this way. TODO: reevaluate.
   *
   * @method toJSON
   * @param {String} [stopId] An optional stop_id string
   */
  toJSON: function( stopId ) {
    var attrs = this.getAttributes({
      props: true,
      derived: true
    });

    // Include stop-specific properties, if a stop is provided
    if ( stopId ) {
      attrs.stop = stopId;
      attrs.timeUntil = this.timeUntil( stopId );
      attrs.seconds = this.secondsToStop( stopId );
    }
    return attrs;
  }
});

module.exports = Trip;
