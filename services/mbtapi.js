/*jshint -W106 */// Disable underscore_case warnings: the API uses them
'use strict';

var _ = require( 'lodash' );
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );
var api = require( './api-query' );

function subwayRoutes() {
  // Sample routes API response data structure:
  // {
  //   mode: [...{
  //     route_type: 'n',
  //     mode_name: 'Subway',
  //     route: [...{
  //       route_id: '946_',
  //       route_name: 'Blue Line'
  //     }]
  //   }]
  // }
  return api.routes().then(function( data ) {
    // GTFS specification: Light Rail === 0, Subway === 1
    // https://developers.google.com/transit/gtfs/reference
    var routesList = _.find( data.mode, {
      route_type: '1'
    }).route;

    return _.chain( routesList )
      // Group together different routes on the same subway line
      .groupBy(function( route ) {
        // 'Red Line' => 'red'
        return route.route_name.split( ' ' )[ 0 ].toLowerCase();
      })
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

/**
 * Get an array of individual stops on the routes for the provided line
 *
 * @method stopsByLine
 * @param  {String} line One of "red", "green", or "blue"
 * @return {Promise} A promise to an array of stops
 */
function stopsByLine( line ) {
  return routesByLine( line ).then(function( routes ) {
    var stopPromises = _.map( routes.routeIds, function( routeId ) {
      return api.stopsByRoute( routeId );
    });

    return Promise.all( stopPromises ).then(function( stops ) {
      return stops;
    });
  });
}

module.exports = {
  subwayRoutes: subwayRoutes,
  routesByLine: routesByLine,
  stopsByLine: stopsByLine
};
