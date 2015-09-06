'use strict';

var _ = require( 'lodash' );
var Model = require( 'ampersand-model' );

var Line = Model.extend({
  // No API request for this: it's basically static data

  props: {
    name: 'string',
    slug: 'string',
    routes: 'array',
    stops: 'array'
  },

  derived: {
    stopsFlattened: {
      deps: [ 'stops' ],
      fn: function() {
        // Eliminate any branch nesting in the stops array
        // Note: _.flatten defaults to deep flatten in lodash.compat
        return _.flatten( this.stops );
      }
    }
  },

  /**
   * Get the station object by parent_station ID
   *
   * @param  {String} parentStation A parent_station ID string
   * @return {[type]} The object for this station from the stops array
   */
  station: function( parentStation ) {
    // Get the stop with the provided parentStation
    return _.findWhere( this.stopsFlattened, {
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
