/*jshint -W106 */// Disable underscore_case warnings: the API uses them
'use strict';

var _ = require( 'lodash' );
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );
var api = require( '../../lib/api-query' );

var getTripsFromRoutes = require( './_get-trips-from-routes' );
var batchRequests = require( './_batch-requests' );

// api.mockPredictions();

// Cache
var LRU = require( 'lru-cache' );
var cache = LRU({
  // Store at max 50 items (won't be hit, just a formality)
  max: 50,
  maxAge: 60000 // 1000 * 60: refresh every minute
});

// Hard-coded route ID list (saves an otherwise useless DB round-trip)
var routes = {
  blue: [ '946_', '948_' ],
  orange: [ '901_', '913_' ],
  red: [ '931_', '933_' ]
}

/**
 * Get predictions for a specified route from cache, or initiate a new
 * API request to retrieve updated prediction data
 *
 * @private
 * @param  {String} routeId An MBTA API unique route_id string
 * @return {Promise}        A promise that will resolve to the route data
 */
function predictionsByRoute( routeId ) {
  var routePredictionsPromise = cache.get( 'predictions-' + routeId );

  if ( ! routePredictionsPromise ) {
    routePredictionsPromise = api.predictionsByRoute( routeId );
    cache.set( 'predictions-' + routeId, routePredictionsPromise );
  }

  return routePredictionsPromise;
}

/**
 * Get an array of trips operating on a given line
 *
 * @param  {String} lineSlug One of "red," "orange," "blue"
 * @return {Promise}         A promise that resolves to an array of trips
 */
function predictionsByLine( lineSlug ) {
  var routeIds = routes[ lineSlug ];

  if ( ! routeIds ) {
    // Fail out
    return Promise.reject( new Error( 'No routes available for the provided line' ) );
  }

  return batchRequests( routeIds, predictionsByRoute ).then( getTripsFromRoutes );
}

module.exports = {
  predictionsByLine: predictionsByLine
};
