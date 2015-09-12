'use strict';

var _ = {
  any: require( 'lodash.some' ),
  filter: require( 'lodash.filter' )
};
var RestCollection = require( './rest-collection' );
var TripModel = require( '../models/trip' );

var TripsCollection = RestCollection.extend({

  props: {
    lastRefreshed: 'date',
    line: 'model',
    loaded: 'boolean'
  },

  model: TripModel,

  initialize: function( arr, opts ) {
    this.line = opts.line;

    // Set a flag so that this collections' consumers can tell when the
    // data is ready for use
    this.loaded = false;
    this.once( 'sync', this.setLoaded );

    if ( ! this.line ) {
      throw new Error( 'TripsCollection requires a line to be specified' );
    }
  },

  /**
   * Event listener to set a "loaded" flag on the collection once it is fetched
   */
  setLoaded: function setLoaded() {
    this.loaded = true;
  },

  url: function() {
    return '/api/v1/lines/' + this.line + '/predictions';
  },

  /**
   * Filter collection down to only those trips which are scheduled to
   * stop at the specified station
   *
   * @param  {String} stopId A stop_id string
   * @return {Array} An array of Trip instances which visit the provided stop
   */
  visits: function( stopId ) {
    return _.filter( this.models, function( trip ) {
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
    // For every trip, check whether it visits any of the specified stops
    return _.filter( this.models, function( trip ) {
      return _.any( stopIds, function( stopId ) {
        return trip.visits( stopId );
      });
    });
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
    return _.filter( this.models, function( trip ) {
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
    // For every trip, check whether it is approaching any of the specified stops
    return _.filter( this.models, function( trip ) {
      return _.any( stopIds, function( stopId ) {
        return trip.approaching( stopId );
      });
    });
  }

});

module.exports = TripsCollection;
