'use strict';

/*jshint -W106 */// Disable underscore_case warnings
var _ = require( 'lodash' );
var Route = require( '../models/route' );

/**
 * Get a dictionary of subway lines by color slug
 *
 * @return {Promise} A promise to an object of line definition objects
 */
function subwayRoutes() {
  return Route.collection().query(function( qb ) {
    qb.where({
      route_type: 1
    });
  }).fetch().then(function( routes ) {
    return _.chain( routes.toJSON() )
      // Group together different routes on the same subway line
      .groupBy(function( route ) {
        // "Red Line" => "red"
        return route.route_name.split( ' ' )[ 0 ].toLowerCase();
      })
      // Reduce each nested array of routes to a single object
      .reduce(function( memo, routeGroup, line ) {
        memo[ line ] = {
          name: _.first( routeGroup ).route_name,
          routeIds: _.pluck( routeGroup, 'route_id' )
        };
        return memo;
      }, {})
      .value();
  });
}

/**
 * Get an array of routes for a specific subway line
 *
 * @method routesByLine
 * @param  {String} line One of "red", "green", or "blue"
 * @return {Promise} A promise to an array of route objects
 */
function routesByLine( line ) {
  return subwayRoutes().then(function( routes ) {
    return routes[ line ];
  });
}

module.exports = {
  subwayRoutes: subwayRoutes,
  routesByLine: routesByLine
};
