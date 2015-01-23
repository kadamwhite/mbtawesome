'use strict';

var config = require( './config' );
var url = require( 'url' );
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );
var rest = require( 'restler' );
var _ = require( 'lodash' );

/**
 * Create a query-handler function for a specific endpoint
 *
 * @example
 *
 *     // Create a utility method for querying against a specific API endpoint,
 *     // and specify an explicit list of required endpoint query parameters:
 *     var getStops = makeQueryHandler( 'stopsbylocation', [ 'lat', 'lon' ] );
 *
 *     getStops( 42.352913, -71.064648 ).then(function( data ) {
 *       console.log( _.pluck( data.stop, 'stop_name' ) );
 *     });
 *
 *     // You may also pass the parameters in an explicit mapping object:
 *     getStops({
 *       lat: 42.352913,
 *       lon: -71.064648
 *     }).then(function( data ) {
 *       console.log( _.pluck( data.stop, 'stop_name' ) );
 *     });
 *
 *     // In the event that an endpoint supports optional parameters, explicit
 *     // required arguments and a hash of optional arguments may be combined:
 *     // the two calls to `schedByStop` below are equivalent.
 *     var schedByStop = makeQueryHandler( 'schedulebystop', [ 'stop' ] );
 *
 *     schedByStop( 'Back Bay', {
 *       route: 'CR-Providence',
 *       max_trips: 5
 *     }).then(function( data ));
 *
 *     schedByStop({
 *       stop: 'Back Bay',
 *       route: 'CR-Providence',
 *       max_trips: 5
 *     });
 *
 * @param  {String} query          The endpoint which this method will query against
 * @param  {Array}  requiredParams An array of required API parameter methods
 * @return {Function}              A function that can be called with
 */
function makeQueryHandler( query, requiredParams ) {
  return function() {
    var args = Array.prototype.slice.call( arguments );

    // Parse the arguments into a query parameter object
    var params = _.reduce( args, function( memo, value, index ) {
      // Walk through the provided required params, one by one
      var key = requiredParams[ index ];

      // An object of param hashes may be passed in,
      if ( _.isObject( value ) ) {
        memo = _.merge( memo, value );
      } else {
        // as may individual values for required parameter keys
        if ( _.isString( key ) ) {
          memo[ key ] = value;
        }
      }
      return memo;
    }, {});

    try {
      _.each( requiredParams, function( key ) {
        if ( _.isUndefined( params[ key ] ) ) {
          throw new Error( 'missing required parameter: ' + key );
        }
      });
    } catch ( err ) {
      return Promise.reject( err );
    }

    var queryString = url.format({
      query: _.merge( params, {
        // Always submit API key and request JSON format
        /*jshint -W106 */// Disable underscore_case warnings: the API uses them
        api_key: config.api.key,
        format: 'json'
      })
    });

    var request = rest.get( config.api.root + query + queryString );

    return new Promise(function( resolve, reject ) {
      function handleSuccess( data ) {
        resolve( data );
      }

      function handleFailure( err, response ) {
        reject( err );
      }

      // Long-term it may make sense not to handle all errors the same...
      request
        // https://github.com/danwrong/restler#events
        .on( 'success', handleSuccess )
        .on( 'error',   handleFailure )
        .on( 'fail',    handleFailure )
        .on( 'timeout', handleFailure );
    });
  };
}

module.exports = makeQueryHandler;
