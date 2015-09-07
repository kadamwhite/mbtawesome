'use strict';

var _ = require( 'lodash' );
var Collection = require( 'ampersand-rest-collection' );

// Dictionary to use when determining issue severity (used in sorting)
var severity = {
  severe: 1,
  moderate: 2,
  minor: 3
};

var AlertsCollection = Collection.extend({

  model: require( '../models/alert' ),

  props: {
    line: 'string',
    loaded: 'boolean'
  },

  initialize: function( arr, opts ) {
    this.line = opts.line;

    // Set a flag so that this collections' consumers can tell when the
    // data is ready for use
    this.loaded = false;
    this.once( 'sync', this.setLoaded );
  },

  /**
   * Event listener to set a "loaded" flag on the collection once it is fetched
   */
  setLoaded: function() {
    this.loaded = true;
  },

  url: function() {
    return '/api/v1/lines/' + this.line + '/alerts';
  },

  refresh: function() {
    var now = new Date();
    // If we updated less than 2 minutes ago, don't fetch new data
    if ( this.lastRefreshed && this.lastRefreshed > now - 1000 * 60 * 2 ) {
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
   * Comparator function to order collection by severity (high to low)
   */
  comparator: function( model ) {
    return severity[ model.severity.toLowerCase() ];
  },

  /**
   * Get all unique banners (critical announcements) in this collection
   *
   * @method banners
   * @return {Array} Array of banner text strings
   */
  banners: function() {
    return this.chain()
      .pluck( 'banner' )
      .without( '' )
      .unique()
      .value();
  }

});

/**
 * Get all unique banners (critical announcements) from a set of AlertsCollections
 *
 * @method banners
 * @static
 * @param {Array} An array of AlertsCollection instances
 * @return {Array} An array of banner strings
 */
AlertsCollection.banners = function( collections ) {
  return _.chain( collections )
    .map(function( collection ) {
      return collection.banners();
    })
    .flatten()
    .without( '' )
    .unique()
    .value();
};

module.exports = AlertsCollection;
