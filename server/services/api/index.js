/*jshint -W106 */// Disable underscore_case warnings: the API uses them
'use strict';

var _ = require( 'lodash' );
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );

var config = require( '../config' );
var api = require( 'mbtapi' ).create({
  apiKey: config.api.key
});

var validLines = require( '../valid-lines' );
var getTripsFromRoute = require( './_get-trips-from-routes' );
var batchRequests = require( './_batch-requests' );

// 15 second cache expiry
var shortCache = require( './_short-cache' );

// 2 minute cache expiry
var longCache = require( './_long-cache' );

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
 * Get predictions for a set of routes from cache, or initiate a new API request
 * to retrieve updated prediction data
 *
 * @private
 * @param  {String[]} routeIds An array of MBTA API unique route_id string
 * @return {Promise}           A promise that will resolve to the route data
 */
function predictionsByRoutes( routeId ) {
  var cacheKey = 'predictions-' + routeId.join( ',' );
  var routePredictionsPromise = shortCache.get( cacheKey );

  if ( ! routePredictionsPromise ) {
    routePredictionsPromise = api.predictionsByRoutes( routeId );
    shortCache.set( cacheKey, routePredictionsPromise );
  }

  return routePredictionsPromise;
}

/**
 * Get an array of trips operating on a given line
 *
 * @param  {String} lineSlug One of "red," "orange," "blue", or "green-[bcde]"
 * @return {Promise}         A promise that resolves to an array of trips
 */
function predictionsByLine( lineSlug ) {
  var errorMessage;

  if ( validLines.invalid( lineSlug ) ) {
    // Fail out
    errorMessage = 'No routes available for the provided line (' + lineSlug + ')';
    return Promise.reject( new Error( errorMessage ) );
  }

  if ( lineSlug === 'green' ) {
    return predictionsByRoutes( validLines.greenLineRoutes ).then(function( results ) {
      // "route_type": "0",
      //   "mode_name": "Subway",
      //   "route": [{
      //     "route_id": "Green-B",
      //     "route_name": "Green Line B",
      //     "direction": [
      return _.flattenDeep( results.mode[0].route.map( getTripsFromRoute ) );
    }).catch(function(err) {
      console.error(err);
    });
  }

  var routeId = validLines.format( lineSlug );

  return predictionsByRoute( routeId ).then(function( results ) {
    // [{
    //   "route_id": "Green-B",
    //   "route_name": "Green Line B",
    //   "direction": [
    return _.flattenDeep( getTripsFromRoute( results ) );
  });
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
    longCache.set( cacheKey, routeAlertsPromise );
  }

  return routeAlertsPromise;
}

/**
 * Get an array of alerts active for a given line
 *
 * @method alertsByLine
 * @param  {String} lineSlug One of "red", "orange", "blue", or "green-[bcde]"
 * @return {Promise}         A promise that resolves to an array of trips
 */
function alertsByLine( lineSlug ) {
  var errorMessage;

  if ( validLines.invalid( lineSlug ) ) {
    // Fail out
    errorMessage = 'No routes available for the provided line (' + lineSlug + ')';
    return Promise.reject( new Error( errorMessage ) );
  }

  var routeId = validLines.format( lineSlug );

  return alertsByRoute( routeId ).then(function( alerts ) {
    // Extract alerts object from data (e.g. `{ alerts: [ [Object], [Object] ] }`)
    return alerts.alerts;
  });
}

module.exports = {
  predictionsByLine: predictionsByLine,
  alertsByLine: alertsByLine
};
