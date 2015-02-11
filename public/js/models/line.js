'use strict';

var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

var Line = Backbone.Model.extend({
  // No API request for this: it's basically static data

  /**
   * Get the nested stops array, optionally flattened into a single list
   *
   * @method stops
   * @param {Object} [opts] An options hash
   * @param {Boolean} [opts.flatten] Whether to flatten the returned array
   * @return {Array} An array of stop objects
   */
  stops: function( opts ) {
    var flatten = opts ? opts.flatten : false;
    var stops = this.get( 'stops' );

    // Optionally eliminate any branch nesting in the stops array
    // Note: _.flatten defaults to deep flatten in lodash.compat
    return flatten ? _.flatten( stops ) : stops;
  },

  /**
   * Get the station object by parent_station ID
   *
   * @param  {String} parentStation A parent_station ID string
   * @return {[type]} The object for this station from the stops array
   */
  station: function( parentStation ) {
    var stops = this.stops({
      flatten: true
    });

    // Get the stop with the provided parentStation
    return _.findWhere( stops, {
      station: parentStation
    });
  }

});

module.exports = Line;
