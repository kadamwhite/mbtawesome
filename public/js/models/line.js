'use strict';

var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

var Line = Backbone.Model.extend({
  // No API request for this: it's basically static data

  stops: function() {
    return this.get( 'stops' );
  },

  /**
   * Get the station object by parent_station ID
   *
   * @param  {String} parentStation A parent_station ID string
   * @return {[type]} The object for this station from the stops array
   */
  station: function( parentStation ) {
    // Eliminate any branch nesting in the stops array
    // Note: _.flatten defaults to deep flatten in lodash.compat
    var stops = _.flatten( this.stops() );

    // Get the stop with the provided parentStation
    return _.findWhere( stops, {
      station: parentStation
    });
  }

});

module.exports = Line;
