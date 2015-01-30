'use strict';

var makeQueryHandler = require( './make-query-handler' );

module.exports = {
  /**
   * Return a complete list of routes for which data can be requested.
   *
   * @method routes
   * @type {Promise} A promise to the /routes API response
   */
  routes: makeQueryHandler( 'routes', [] ),

  /**
   * Return a list of routes that serve a particular stop.
   *
   * @method routesByStop
   * @param {String} stop GTFS-compatible stop_id value, e.g. "Back Bay" or "70065."
   * @type {Promise} A promise to the /routesbystop API response
   */
  routesByStop: makeQueryHandler( 'routesbystop', [ 'stop' ] ),

  /**
   * Returns a list of all stops served by a route
   *
   * @method stopsByRoute
   * @param {String} route GTFS-compatible route_id value on the stop for which schedules should
   *                       be returned, e.g. "931_".
   * @type {Promise} A promise to the /stopsbyroute API response
   */
  stopsByRoute: makeQueryHandler( 'stopsbyroute', [ 'route' ] ),

  /**
   * Returns a list of all stops near a specified latitude/longitude.
   *
   * @method stopsByLocation
   * @param {Number} lat The latitude for the location near which stops should be returned,
   *                     e.g. "42.352913".
   * @param {Number} lon The longitude for the location near which stops should be returned,
   *                     e.g. "-71.064648".
   * @type {Promise}     A promise to the /stopsbylocation API response
   */
  stopsByLocation: makeQueryHandler( 'stopsbylocation', [ 'lat', 'lon' ] ),

  /**
   * Returns scheduled arrivals and departures at a particular stop
   *
   * @method scheduleByStop
   * @param {String} stop        GTFS-compatible stop_id value, e.g. "Back Bay" or "2579."
   * @param {String} [route]     GTFS-compatible route_id value on the stop for which schedule
   *                             should be returned, e.g. "CR-Providence". If not included then
   *                             the schedules for all routes serving the stop will be returned.
   * @param {String} [direction] GTFS-compatible direction_id Bit value on route of the stop
   *                             for which schedule should be returned, e.g. "0" or "1". If
   *                             included then route must also be included. If not included
   *                             then schedule for all directions of the route serving the stop
   *                             will be returned.
   * @param {Number} [datetime]  Epoch time after which schedule should be returned. Integer
   *                             in Seconds, e.g. "1361989200". If included then must be
   *                             within the next seven (7) days. If not included then schedule
   *                             starting from the current datetime will be returned.
   * @param {Number} [max_time]  Defines maximum range of time (in minutes) within which trips
   *                             will be returned. Integer between 1 and 1440 (24 hours).
   *                             If not included defaults to 60.
   * @param {Number} [max_trips] Defines number of trips to return. Integer between 1 and 100.
   *                             If not included defaults to 5.
   * @type {Promise} A promise to the /schedulebystop API response
   */
  scheduleByStop: makeQueryHandler( 'schedulebystop', [ 'stop' ] ),

  /**
   * Returns scheduled arrivals and departures for a particular route
   *
   * @method scheduleByRoute
   * @param {String} route       GTFS-compatible route_id value for which schedule should be
   *                             returned, e.g. "CR-Providence".
   * @param {String} [direction] GTFS-compatible direction_id Bit value on route of the stop
   *                             for which schedule should be returned, e.g. "0" or "1". If not
   *                             included then the schedule for all directions of the route
   *                             serving the stop will be returned.
   * @param {Number} [datetime]  Epoch time after which schedule should be returned. Integer
   *                             in Seconds, e.g. "1361989200". If included then must be
   *                             within the next seven (7) days. If not included then schedule
   *                             starting from the current datetime will be returned.
   * @param {Number} [max_time]  Defines maximum range of time (in minutes) within which trips
   *                             will be returned. Integer between 1 and 1440 (24 hours).
   *                             If not included defaults to 60.
   * @param {Number} [max_trips] Defines number of trips to return. Integer between 1 and 100.
   *                             If not included defaults to 5.
   * @type {Promise} A promise to the /schedulebyroute API response
   */
  scheduleByRoute: makeQueryHandler( 'schedulebyroute', [ 'route' ] ),

  /**
   * Returns scheduled arrivals and departures for a particular trip
   *
   * @method scheduleByTrip
   * @param {String} trip        GTFS-compatible trip_id value for which schedule should be
   *                             returned, e.g. "CR-Providence-CR-Weekday-807" or "25385462".
   * @param {Number} [datetime]  Epoch time after which schedule should be returned. Integer
   *                             in Seconds, e.g. "1361989200". If included then must be
   *                             within the next seven (7) days. If not included then schedule
   *                             starting from the current datetime will be returned.
   * @type {Promise} A promise to the /schedulebytrip API response
   */
  scheduleByTrip: makeQueryHandler( 'schedulebytrip', [ 'trip' ] ),

  /**
   * Returns arrival/departure predictions, plus vehicle locations and alert headers, for a stop
   *
   * @method predictionsByStop
   * @param {String} stop                      GTFS-compatible stop_id value for which predictions
   *                                           should be returned, e.g. "2579."
   * @param {Boolean} [include_access_alerts]  Whether or not alerts pertaining to accessibility
   *                                           (elevators, escalators) should be returned.
   *                                           Possible values: "true" or "false"; default value:
   *                                           "false". If not included, then alerts pertaining to
   *                                           accessibility are not returned.
   * @param {Boolean} [include_service_alerts] Whether or not service alerts should be returned.
   *                                           Possible values: "true" or "false"; default value:
   *                                           "true". If not included, then service alerts will
   *                                           be returned.
   * @return {Promise} A promise to the /predictionsbystop API response
   */
  predictionsByStop: makeQueryHandler( 'predictionsbystop', [ 'stop' ] ),

  /**
   * Returns arrival/departure predictions, plus vehicle locations and alert headers, for a route
   *
   * @method predictionsByRoute
   * @param {String} route                     GTFS-compatible route_id value for which
   *                                           predictions should be returned, e.g. "931_".
   * @param {Boolean} [include_access_alerts]  Whether or not alerts pertaining to accessibility
   *                                           (elevators, escalators) should be returned.
   *                                           Possible values: "true" or "false"; default value:
   *                                           "false". If not included, then alerts pertaining to
   *                                           accessibility are not returned.
   * @param {Boolean} [include_service_alerts] Whether or not service alerts should be returned.
   *                                           Possible values: "true" or "false"; default value:
   *                                           "true". If not included, then service alerts will
   *                                           be returned.
   * @return {Promise} A promise to the /predictionsbyroute API response
   */
  predictionsByRoute: makeQueryHandler( 'predictionsbyroute', [ 'route' ] ),

  /**
   * Returns arrival/departure predictions, plus vehicle location, for a trip
   *
   * @method predictionsByTrip
   * @param {String} trip GTFS-compatible trip_id value for which predictions should be returned,
   *                      e.g. "CR-Providence-CR-Weekday-807".
   * @return {Promise} A promise to the /predictionsbytrip API response
   */
  predictionsByTrip: makeQueryHandler( 'predictionsbytrip', [ 'trip' ] ),

  /**
   * Returns vehicle locations for a route
   *
   * @method vehiclesByRoute
   * @param {String} route GTFS-compatible route_id value for which vehicle positions should be
   *                       returned, e.g. "931_".
   * @return {Promise} A promise to the /vehiclesbyroute API response
   */
  vehiclesByRoute: makeQueryHandler( 'vehiclesbyroute', [ 'route' ] ),

  /**
   * Returns vehicle location for a trip
   *
   * @method vehiclesByTrip
   * @param {String} trip GTFS-compatible trip_id value for which vehicle positions should be
   *                      returned, e.g. "CR-Providence-CR-Weekday-807".
   * @return {Promise} A promise to the /vehiclesbytrip API response
   */
  vehiclesByTrip: makeQueryHandler( 'vehiclesbytrip', [ 'trip' ] )

  /**
   * Returns a list of all alerts, with all details
   *
   * @method alerts
   */
  // TODO: alerts method

  /**
   * Returns a list of all alerts applicable to a route, with all details
   *
   * @method alertsByRoute
   */
  // TODO: alertsByRoute method

  /**
   * Returns a list of all alerts applicable to a stop, with all details
   *
   * @method alertsByStop
   */
  // TODO: alertsByStop method

  /**
   * Returns one alert, with all details
   *
   * @method alertById
   */
  // TODO: alertById method

  /**
   * Returns a list of all alerts, header information only
   *
   * @method alertHeaders
   */
  // TODO: alertHeaders method

  /**
   * Returns a list of all alerts applicable to a route, header information only
   *
   * @method alertHeadersByRoute
   */
  // TODO: alertHeadersByRoute method

  /**
   * Returns a list of all alerts applicable to a stop, header information only
   *
   * @method alertHeadersByStop
   */
  // TODO: alertHeadersByStop method

  /**
   * Returns the current server time
   *
   * @method serverTime
   */
  // TODO: serverTime method
};

// Airplane Mode
module.exports.mockPredictions = function() {
  var dataGroup = 'r01';
  var readFileAsync = require( 'bluebird' ).promisify( require( 'fs' ).readFile );

  function getMockData( id ) {
    var path = require( 'path' ).resolve( __dirname, [
      '../../api-mock/',
      dataGroup, '-', id, '.json'
    ].join( '' ));

    return readFileAsync( path ).then(function( result ) {
      return JSON.parse( result );
    });
  };

  module.exports.predictionsByStop = getMockData;
  module.exports.predictionsByRoute = getMockData;
};
