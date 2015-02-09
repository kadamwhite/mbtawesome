'use strict';

var _ = require( 'lodash' );
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );

function getReason( settledPromise ) {
  var reason = settledPromise.reason();

  // Attempt to extract the most useful part of the error
  if ( reason.error && reason.error.message ) {
    if ( _.isArray( reason.error.message ) ) {
      // Message is an array: join it into a string
      return reason.error.message.join(', ');
    }
    // Not an array: return the raw message
    return reason.error.message;
  }
  // Couldn't access .error.message property: pass through
  return reason;
}

/**
 * Run a given method for multiple routes, and settle the responses
 *
 * @private
 * @param  {Array} routeIds An array of route_id identifier strings
 * @return {Promise}        A promise resolving to an array of route predictions
 */
function batchRequests( ids, reqFn ) {
  var reqProms = _.map( ids, function( id ) {
    return reqFn( id );
  });

  // Sort out successful results from rejections
  return Promise.settle( reqProms ).then(function( settledPromises ) {

    // Reduce PromiseInspection array into arrays of results and rejections
    var results = _.reduce( settledPromises, function( memo, settledPromise ) {
      if ( settledPromise.isFulfilled() ) {
        memo.complete.push( settledPromise.value() );
      } else {
        // Promise was rejected: find out why
        memo.failed.push( getReason( settledPromise ) );
      }

      return memo;
    }, {
      complete: [],
      failed: []
    });

    // Optimistic resolution: succeed if any requests went through
    if ( results.complete.length > 0 ) {
      return results.complete;
    }

    // If everything failed, throw an error
    // TODO: Special handling for requests outside of operating hours?
    throw new Error( 'All requests failed:' + results.failed.join( '\n' ) );
  });
}

module.exports = batchRequests;
