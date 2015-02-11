'use strict';

var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

// Dictionary to use when determining issue severity (used in sorting)
var severity = {
  severe: 1,
  moderate: 2,
  minor: 3
};

var AlertsCollection = Backbone.Collection.extend({

  model: require( '../models/alert' ),

  initialize: function( arr, opts ) {
    this.line = opts && opts.line || arr.line;
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
    return severity[ model.get( 'severity' ).toLowerCase() ];
  },

  /**
   * Get all unique banners (critical announcements) in this collection
   *
   * @method banners
   * @return {Array} Array of banner text strings
   */
  banners: function() {
    return this.chain()
      .map(function( model ) {
        return model.banner();
      })
      .without( '' )
      .unique()
      .value();
  },

  /**
   * Filter the collection to only those alerts currently in effect
   *
   * @method inEffect
   * @return {Array} An array of Alert models
   */
  inEffect: function() {
    return this.filter(function( alert ) {
      return alert.inEffect();
    });
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
AlertsCollection.banners = function getAllBanners( collections ) {
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
