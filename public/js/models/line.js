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
  },

  /**
   * Get the stops array for a provided parent_station ID
   *
   * @param  {[type]} parentStation [description]
   * @return {[type]}               [description]
   */
  stopsByStation: function( parentStation ) {
    var station = this.station( parentStation );

    // Fail out if we got nothing back
    if ( ! station ) {
      return;
    }

    // If we got a station back, get a list of unique stops contained within
    // this station: De-dupe stops on ID to avoid double-listing trains
    // approaching the end-of-line terminal stations (which are included with
    // the same stop_id in both directions)
    return _.unique( station.stops, function( stop ) {
      return stop.id;
    });
  }

});

module.exports = Line;
