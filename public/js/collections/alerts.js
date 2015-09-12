'use strict';

var _ = {
  pluck: require( 'lodash.pluck' ),
  flatten: require( 'lodash.flatten' ),
  map: require( 'lodash.map' ),
  unique: require( 'lodash.uniq' ),
  without: require( 'lodash.without' )
};
var RestCollection = require( './rest-collection' );

// Dictionary to use when determining issue severity (used in sorting)
var severity = {
  severe: 1,
  moderate: 2,
  minor: 3
};

var AlertsCollection = RestCollection.extend({

  model: require( '../models/alert' ),

  props: {
    /**
     * Slug of the line to which this alerts collection applies, for use
     * constructing the collection's URL
     *
     * @property {String} line
     */
    line: 'string',
    /**
     * Whether the collection has synced (for use displaying the loading indicator)
     *
     * @property {Boolean} loaded
     */
    loaded: {
      type: 'boolean',
      default: false
    }
  },

  initialize: function( arr, opts ) {
    // Props don't get auto-assigned from options in Collections: set .line manually
    this.line = opts && opts.line;

    // Set a flag so that this collections' consumers can tell when the
    // data is ready for use
    this.once( 'sync', this._setLoaded );
  },

  /**
   * Event listener to set a "loaded" flag on the collection once it is fetched
   *
   * @private
   */
  _setLoaded: function() {
    this.loaded = true;
  },

  url: function() {
    return '/api/v1/lines/' + this.line + '/alerts';
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
    var banners = _.pluck( this.models,  'banner' );
    return _.unique( _.without( banners, '' ) );
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
  var banners = _.map( collections, function( collection ) {
    return collection.banners();
  });
  return _.unique( _.flatten( banners ) );
};

module.exports = AlertsCollection;
