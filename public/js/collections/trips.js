'use strict';

var Backbone = require( 'backbone' );

var TripsCollection = Backbone.Collection.extend({

  initialize: function( arr, opts ) {
    this.line = opts.line;

    if ( ! this.line ) {
      throw new Error( 'TripsCollection requires a line to be specified' );
    }
  },

  model: require( '../models/trip' ),

  url: function() {
    return '/api/v1/lines/' + this.line + '/predictions';
  },

  refresh: function() {
    var now = new Date();
    // If we updated less than 20 seconds ago, don't fetch new data
    if ( this.lastRefreshed && this.lastRefreshed > now - 1000 * 20 ) {
      return {
        // Mock promise interface, just in case
        then: function( cb ) {
          cb( this.toJSON() );
        }
      };
    }

    // We updated more than 20 seconds ago: get new data from the API
    this.lastRefreshed = now;
    return this.fetch();
  },

  /**
   * Filter collection down to only those trips which are scheduled to
   * stop at the specified station
   *
   * @param  {String} stopId A stop_id string
   * @return {Array} An array of Trip instances which visit the provided stop
   */
  visits: function( stopId ) {
    return this.filter(function( trip ) {
      return trip.visits( stopId );
    });
  },

  /**
   * Filter collection down to trips which visit any of the provided stations
   *
   * @method visitsAny
   * @param  {Array} stopIds An array of stop_id strings
   * @return {Array} Array of Trip instances which visit these stops
   */
  visitsAny: function( stopIds ) {
    var theseTrips = this;

    return _.chain( stopIds )
      // De-dupe stopIds to avoid double-counting trips to terminal
      // stations (Alewife, Oak Grove, Bowdoin etc)
      .unique()
      .map(function( stopId ) {
        return theseTrips.visits( stopId );
      })
      // Flatten results
      .flatten()
      // Throw out any empty arrays
      .reject(function( trips ) {
        return trips.length === 0;
      })
      .value();
  },

  /**
   * Filter collection down to only those trips making their next stop
   * at the provided station
   *
   * @method approaching
   * @param  {String} stopId A stop_id string
   * @return {Array} Array of Trip instances approaching this stop
   */
  approaching: function( stopId ) {
    return this.filter(function( trip ) {
      return trip.approaching( stopId );
    });
  },

  /**
   * Get all trips in this collection which are approaching any of the
   * provided stations
   *
   * @method approachingAny
   * @param  {Array} stopIds An array of stop_id strings
   * @return {Array} Array of all trips approaching any of these stops
   */
  approachingAny: function( stopIds ) {
    var theseTrips = this;

    return _.chain( stopIds )
      // De-dupe stopIds to avoid double-counting trips to terminal
      // stations (Alewife, Oak Grove, Bowdoin etc)
      .unique()
      .map(function( stopId ) {
        return theseTrips.approaching( stopId );
      })
      // Flatten results
      .flatten()
      // Throw out any empty arrays
      .reject(function( trips ) {
        return trips.length === 0;
      })
      .value();
  }

});

module.exports = TripsCollection;
