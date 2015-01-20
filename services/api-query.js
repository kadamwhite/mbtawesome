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

  /**
   * Returns scheduled arrivals and departures at a particular stop
   *
   * @method scheduleByStop
   */

  /**
   * Returns scheduled arrivals and departures for a particular route
   *
   * @method scheduleByRoute
   */

  /**
   * Returns scheduled arrivals and departures for a particular trip
   *
   * @method scheduleByTrip
   */

  /**
   * Returns arrival/departure predictions, plus vehicle locations and alert headers, for a stop
   *
   * @method predictionsByStop
   */

  /**
   * Returns arrival/departure predictions, plus vehicle locations and alert headers, for a route
   *
   * @method predictionsByRoute
   */

  /**
   * Returns arrival/departure predictions, plus vehicle location, for a trip
   *
   * @method predictionsByTrip
   */

  /**
   * Returns vehicle locations for a route
   *
   * @method vehiclesByRoute
   */

  /**
   * Returns vehicle location for a trip
   *
   * @method vehiclesByTrip
   */

  /**
   * Returns a list of all alerts, with all details
   *
   * @method alerts
   */

  /**
   * Returns a list of all alerts applicable to a route, with all details
   *
   * @method alertsByRoute
   */

  /**
   * Returns a list of all alerts applicable to a stop, with all details
   *
   * @method alertsByStop
   */

  /**
   * Returns one alert, with all details
   *
   * @method alertById
   */

  /**
   * Returns a list of all alerts, header information only
   *
   * @method alertHeaders
   */

  /**
   * Returns a list of all alerts applicable to a route, header information only
   *
   * @method alertHeadersByRoute
   */

  /**
   * Returns a list of all alerts applicable to a stop, header information only
   *
   * @method alertHeadersByStop
   */

  /**
   * Returns the current server time
   *
   * @method serverTime
   */
};
