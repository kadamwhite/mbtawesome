/*jshint -W106 */// Disable underscore_case warnings: the API uses them
'use strict';

var _ = require( 'lodash' );
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );
var api = require( '../../lib/api-query' );

var getTripsFromRoutes = require( './_get-trips-from-routes' );
var batchRequests = require( './_batch-requests' );

api.mockPredictions();

// 15 second cache expiry
var shortCache = require( './_short-cache' );

// 5 minute cache expiry
var longCache = require( './_long-cache' );

// Hard-coded route ID list (saves an otherwise useless DB round-trip)
var routes = {
  blue: [ '946_', '948_' ],
  orange: [ '903_', '913_' ],
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
  var cacheKey = 'predictions-' + routeId;
  var routePredictionsPromise = shortCache.get( cacheKey );

  if ( ! routePredictionsPromise ) {
    routePredictionsPromise = api.predictionsByRoute( routeId );
    shortCache.set( cacheKey, routePredictionsPromise );
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

/**
 * Make (and cache) a request to the alerts API for the provided route
 *
 * @private
 * @param  {String} routeId An MBTA API unique route_id string
 * @return {Promise}        A promise that will resolve to the route's alert data
 */
function alertsByRoute( routeId ) {
  var cacheKey = 'alerts-' + routeId;
  var routeAlertsPromise = longCache.get( cacheKey);

  if ( ! routeAlertsPromise ) {
    routeAlertsPromise = api.alertsByRoute( routeId );
    shortCache.set( cacheKey, routeAlertsPromise );
  }

  return routeAlertsPromise;
}

/**
 * Get an array of alerts active for a given line
 *
 * @method alertsByLine
 * @param  {String} lineSlug One of "red", "orange," or "blue"
 * @return {Promise}         A promise that resolves to an array of trips
 */
function alertsByLine( lineSlug ) {
  var routeIds = routes[ lineSlug ];

  if ( ! routeIds ) {
    // Fail out
    return Promise.reject( new Error( 'No routes available for the provided line' ) );
  }

  return batchRequests( routeIds, alertsByRoute ).then(function( alerts ) {
    return _.chain( alerts )
      // Extract alerts object from data (e.g. `[ { alerts: [ [Object], [Object] ] } ]`)
      .pluck( 'alerts' )
      // Flatten alerts from multiple routes into a single array
      .flatten()
      // De-dupe on ID (one alert can affect many lines, and may be returned twice)
      .unique( 'alert_id' )
      .value()
  })
}

module.exports = {
  predictionsByLine: predictionsByLine,
  alertsByLine: alertsByLine
};
