'use strict';

/*jshint -W106 */// Disable underscore_case warnings
var _ = require( 'lodash' );
var Route = require( '../models/route' );
var Stop = require( '../models/stop' );

/**
 * Get a dictionary of subway lines by color slug
 *
 * @return {Promise} A promise to an object of line definition objects
 */
function subwayRoutes() {
  return Route.collection().query({
    where: {
      route_type: 1
    }
  }).fetch().then(function( routes ) {
    return _.chain( routes.toJSON() )
      // Group together different routes on the same subway line
      .groupBy(function( route ) {
        // "Red Line" => "red"
        return route.route_name.split( ' ' )[ 0 ].toLowerCase();
      })
      // Reduce each nested array of routes to a single object
      .reduce(function( memo, routeGroup, line ) {
        memo.push({
          id: line,
          name: _.first( routeGroup ).route_name,
          routeIds: _.pluck( routeGroup, 'route_id' )
        });
        return memo;
      }, [])
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
    return _.findWhere( routes, {
      id: line
    });
  });
}

/**
 * Get an array of individual stops on the provided routes
 *
 * @method stopsByRoute
 * @param {String|Array} routes A route ID string, or array of route ID strings
 * @return {Promise} A promise to an array of stop objects
 */
function stopsByRoute( routes ) {
  if ( ! _.isArray( routes ) ) {
    routes = [ routes ];
  }

  return Stop.collection().query(function( qb ) {
    qb.where( 'route_id', 'in', routes );
  }).fetch().then(function( stops ) {
    return stops;
  });
}

/**
 * Get an array of individual stops on the routes for the provided line
 *
 * @method stopsByLine
 * @param {String} line One of "red," "green" or "blue"
 * @return {Promise} A promise to an array of stop objects
 */
function stopsByLine( line ) {
  return routesByLine( line ).then(function( routes ) {
    return stopsByRoute( routes.routeIds );
  });
}

module.exports = {
  subwayRoutes: subwayRoutes,
  routesByLine: routesByLine,
  stopsByRoute: stopsByRoute,
  stopsByLine: stopsByLine
};
