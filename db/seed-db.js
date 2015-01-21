// Populate the database with information from the MBTA API.
// This script focuses on less-mutable objects such as routes and stops,
// not real-time prediction information.

/*jshint -W106 */// Disable underscore_case warnings: the API uses them
'use strict';

var _ = require( 'lodash' );
var api = require( '../services/api-query' );

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
  var modes = _.chain( data.mode )
    .map(function( mode ) {
      return _.map( mode.route, function( route ) {
        return _.merge( {}, route, _.pick( mode, [
          'route_type',
          'mode_name'
        ]) );
      });
    })
    .flatten()
    .value();

  // TODO: Save these in the DB
  return modes;
});
