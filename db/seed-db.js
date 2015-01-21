// Populate the database with information from the MBTA API.
// This script focuses on less-mutable objects such as routes and stops,
// not real-time prediction information.
/*jshint -W106 */// Disable underscore_case warnings
'use strict';

var _ = require( 'lodash' );
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );
var api = require( '../services/api-query' );
// var DB = require( './index' );
var Route = require( '../models/route' );
var Stop = require( '../models/stop' );

/**
 * Make an array of calls in sequence, to play nice with the API rate
 *
 * @property {Function[]} promFns An array of functions that return promises
 * @return {Promise} A promise to the completion of all calls
 */
function sequence(promFns) {
  return promFns.reduce(function(sequence, promFn) {
    // Wait for the previous promise in the array to complete...
    return sequence.then(function(collectedResults) {
      // ...then execute the provided function
      return promFn().then(function(results) {
        // Store the result of the returned promise,
        collectedResults.push(results);
        // and return the results collection in our then
        return collectedResults;
      });
    });
  }, Promise.resolve([]));
}

/**
 * Take an array of objects and save them in the DB as the provided model
 */
function saveCollectionAsModel( arr, model ) {
  var collection = model.collection( arr );

  /* saving temporarily disabled b/c I don't know what I'm doing */
  /* ----------------------------------------------------------- */

  var savePromises = collection.invoke( 'save', {}, {
    method: 'insert'
  });

  return Promise.all( savePromises ).then(function( result ) {
    console.log( 'Inserted ' + result.length + ' records' );
    return result;
  });

  return collection;
}

console.log( 'Fetching routes from the API server...' );

api.routes().then(function( data ) {
  // Sample routes API response data structure:
  // {
  //   mode: [{
  //     route_type: 'n',
  //     mode_name: 'Subway',
  //     route: [{
  //       route_id: '946_',
  //       route_name: 'Blue Line'
  //     }, ...]
  //   }, ...]
  // }
  var routes = _.chain( data.mode )
    // Combine each route's properties with those from its parent mode
    .map(function( mode ) {
      return _.map( mode.route, function( route ) {
        return _.merge( {}, route, _.pick( mode, [
          'route_type',
          'mode_name'
        ]) );
      });
    })
    // Boil down the nested arrays
    .flatten()
    .value();

  return saveCollectionAsModel( routes, Route );
}).then(function( routesCollection ) {

  // Filter method to select only routes categorized as subway or light rail
  function subwayAndLightRail( model ) {
    // Route type comes from the API as a string: coerce to a number
    var type = +model.get( 'route_type' );

    // Subway === 1, Light Rail === 0
    return 1 === type || 0 === type;
  }

  // Return a function that starts an API request returns a promise
  function createStopsApiQueryFn( model ) {
    var route_id = model.get( 'route_id' );
    // Return a function that will pull stops for this route from the API
    return function() {
      return api.stopsByRoute( model.get( 'route_id' ) ).then(function( stops ) {
        // From the API documentation, v2.0.1:
        // > The `route_id` and `route_name` properties of the `stop_list` are
        // > currently not displayed. They will be displayed as properties of
        // > the `stop_list` in a future update.
        stops.route_id = model.get( 'route_id' );
        stops.route_name = model.get( 'route_name' );
        return stops;
      });
    }
  }

  // Convert the collection of models into an array of functions that will fire requests
  var getStopsByRouteFns = routesCollection
    .filter( subwayAndLightRail )
    .map( createStopsApiQueryFn );

  // Execute those requests sequentially, rather than spamming the API all at once
  return sequence( getStopsByRouteFns );
}).then(function( results ) {
  // `results` is an array of API response data.
  // Sample stops API response data structure:
  // {
  //   direction: [{
  //     direction_id: '0',
  //     direction_name: 'Southbound',
  //     stop: [{
  //       stop_order: '1',
  //       stop_id: '70061',
  //       stop_name: 'Alewife Station Red Line',
  //       parent_station: 'place-alfcl',
  //       parent_station_name: 'Alewife Station',
  //       stop_lat: '42.3954277038574',
  //       stop_lon: '-71.1424865722656'
  //     }, ... ]
  //   }, ... ]
  // }
  var stops = _.chain( results )
    .map(function( data ) {
      return _.chain( data.direction )
        // Combine each route's properties with those from its parent mode
        .map(function( direction ) {
          return _.map( direction.stop, function( stop ) {
            return _.merge( {
              route_id: data.route_id,
              direction_id: direction.direction_id,
              direction_name: direction.direction_name
            }, stop );
          });
        })
        // Boil down the nested arrays
        .flatten()
        .value();
    })
    .flatten()
    .value();

  return saveCollectionAsModel( stops, Stop );
}).then(function( result ) {
  console.log( 'Data Population Complete. Exiting...' );
  process.exit( 0 );
}).catch(function( err ) {
  console.error( 'Something went wrong! Aborting...' );
  console.error( err );
  process.exit( 1 );
});
