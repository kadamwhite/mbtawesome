// Populate the database with information from the MBTA API.
// This script focuses on less-mutable objects such as routes and stops,
// not real-time prediction information.
'use strict';

var _ = require( 'lodash' );
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );
var api = require( '../services/api-query' );
var DB = require( './index' );
var Route = require( '../models/route' );

console.log( 'Fetching routes from the API server...' );

api.routes().then(function( data ) {
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
  var routes = _.chain( data.mode )
    // Combine each route's properties with those from its parent mode
    .map(function( mode ) {
      return _.map( mode.route, function( route ) {
        return _.merge( {}, route, _.pick( mode, [
          /*jshint -W106 */// Disable underscore_case warnings
          'route_type',
          'mode_name'
        ]) );
      });
    })
    // Boil down the nested arrays
    .flatten()
    .value();

  var Routes = DB.Collection.extend({
    model: Route
  });

  var savePromises = Routes.forge( routes ).invoke( 'save', {}, {
    method: 'insert'
  });

  return Promise.all( savePromises ).then(function( result ) {
    console.log( result );
    console.log( 'Routes inserted into database' );
    process.exit( 0 );
  });
}).catch(function( err ) {
  console.error( 'Something went wrong!' );
  console.error( err );
  process.exit( 1 );
});
