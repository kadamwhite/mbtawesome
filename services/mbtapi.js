/*jshint -W106 */// Disable underscore_case warnings: the API uses them
'use strict';

var _ = require( 'lodash' );
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );
var api = require( './api-query' );
var db = require( './db' );

/**
 * Get an array of individual stops on the routes for the provided line
 *
 * @method stopsByLine
 * @param  {String} line One of "red", "green", or "blue"
 * @return {Promise} A promise to an array of stops
 */
function stopsByLine( line ) {
  return db.routesByLine( line ).then(function( routes ) {
    var stopPromises = _.map( routes.routeIds, function( routeId ) {
      return api.stopsByRoute( routeId );
    });

    return Promise.all( stopPromises ).then(function( stops ) {
      return stops;
    });
  });
}

module.exports = {
  stopsByLine: stopsByLine
};
