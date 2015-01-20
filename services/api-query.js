'use strict';

var makeQueryHandler = require( './make-query-handler' );

module.exports = {
  /**
   * Return a complete list of routes for which data can be requested.
   *
   * @method routes
   * @param {(...String|Object)} params Required and/or optional query parameter values
   * @type {Promise} A promise to the /routes API response
   */
  routes: makeQueryHandler( 'routes', [] ),
  /**
   * Return a list of routes that serve a particular stop.
   *
   * @method routesByStop
   * @param {(...String|Object)} params Required and/or optional query parameter values
   * @type {Promise} A promise to the /routesbystop API response
   */
  routesByStop: makeQueryHandler( 'routesbystop', [ 'stop' ] ),
  /**
   * Returns a list of all stops served by a route
   *
   * @method stopsByRoute
   * @param {(...String|Object)} params Required and/or optional query parameter values
   * @type {Promise} A promise to the /stopsbyroute API response
   */
  stopsByRoute: makeQueryHandler( 'stopsbyroute', [ 'route' ] ),
  /**
   * Returns a list of all stops near a specified latitude/longitude.
   *
   * @method stopsByLocation
   * @param {(...Float|Object)} params Required and/or optional query parameter values
   * @type {Promise} A promise to the /stopsbylocation API response
   */
  stopsByLocation: makeQueryHandler( 'stopsbylocation', [ 'lat', 'lon' ] )
};
