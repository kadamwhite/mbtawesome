'use strict';

var Backbone = require( 'backbone' );
var _ = require( 'lodash' );

var Stops = Backbone.Collection.extend({
  model: require( '../models/stop' ),

  initialize: function( arr, opts ) {
    this.line = opts.line;

    // Auto-compact data on load
    this.on( 'reset sync', this.compact );
  },

  url: function() {
    return [ '/api/v1/lines', this.line, 'stops' ].join( '/' );
  },

  /**
   * Remove stations from the collection if they are part of a route
   * that is a subset of a longer route on the same line
   */
  compact: function() {
    var self = this;

    // Nest dictionarys of stop IDs to stops within one of stops by route ID
    // (Uses reduce to replicate the behavior of lodash.mapValues)
    var stopsByIdByRoute = _.reduce( this.groupBy( 'route_id' ), function( stopsByRoute, stops, routeId ) {
      stopsByRoute[ routeId ] = _.reduce( stops, function( memo, stop ) {
        // Return a mapping of a stop's stop_id to that stop object's ID
        // (Note that there may be duplication within a route for terminal
        // stops like Alewife, in which case a value would get overwritten;
        // that's fine for our purposes, i.e. de-duping BETWEEN routes)
        memo[ stop.get( 'stop_id' ) ] = stop.id;
        return memo;
      }, {});
      return stopsByRoute;
    }, {});

    // Get an array of route IDs strings, ordered from the route with the
    // fewest stops to the route with the most
    var routeIds = _.chain( stopsByIdByRoute )
      .reduce(function( memo, stops, routeId ) {
        memo.push({
          routeId: routeId,
          count: _.size( stops )
        });
        return memo;
      }, [])
      // Sort route objects by ascending stop count (shorter routes first)
      .sortBy(function( stop ) {
        return stop.count;
      })
      // Bake down to a simple array of route IDs
      .pluck( 'routeId' )
      .value();

    var duplicatedStops = (function findDuplicates( remainingRouteIds ) {
      // If we're done, exit out (no point processing the last route)
      if ( remainingRouteIds.length <= 1 ) {
        return [];
      }

      var currentRouteId = remainingRouteIds.shift();
      var currentStops = stopsByIdByRoute[ currentRouteId ];

      // Get an array of stops from shorter routes that exist in longer routes
      var duplicatedStops = _.chain( currentStops )
        .keys()
        // Use our dictionary to check remaining routes for other occurrences
        // of this same stop: filter down to only the stops with duplicates
        .filter(function( stopId ) {
          return _.any( remainingRouteIds, function( routeId ) {
            return !!stopsByIdByRoute[ routeId ][ stopId ];
          });
        })
        // Return the model for this ID
        .map(function( stopId ) {
          return self.where({ id: currentStops[ stopId ] });
        })
        // After .where, we have an array of arrays: flatten it
        .flatten()
        .value();

      // Recurse, combining the returned results with the ones here
      return duplicatedStops.concat( findDuplicates( remainingRouteIds ) );

    })( routeIds );

    // Remove duplicates from the collection
    this.remove( duplicatedStops );
  },

  byStation: function() {
    return this.chain()
      .groupBy(function( stop ) {
        return stop.get( 'parent_station' );
      })
      .reduce(function( memo, group ) {
        memo.push( group );
        return memo;
      }, [])
      .sortBy(function( group ) {
        // Descending order by station ID
        window.g = group;
        return -_.find( group, function( stop ) {
          return stop.get( 'direction_id' ) === 0;
        }).get( 'stop_id' );
      })
      .value();
  }
});

module.exports = Stops;
