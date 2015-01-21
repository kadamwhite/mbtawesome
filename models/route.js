'use strict';

var BaseModel = require( './base-model' );

var Route = BaseModel.extend({
  tableName: 'routes',
  idAttribute: 'route_id'
});

// TODO: Implement a custom save method on BaseModel to white-list
// only the fields appearing in a models' `.fields` array
Route.fields = [
  /**
   * The unique GTFS-compatible identifier for the route
   * @example "931_"
   * @property {String} route_id
   */
  'route_id',
  /**
   * The human-readable name for the route
   * @example "Red Line"
   * @property {String} route_name
   */
  'route_name',
  /**
   * The GTFS-compatible identifier for the type of service (mode)
   * @example 1
   * @property {Number} route_type
   */
  'route_type',
  /**
   * The human-readable name for the type of service (mode)
   * @example "Subway"
   * @property {String} mode_name
   */
  'mode_name',
  /**
   * Whether this route should be hidden from users in some contexts
   * @property {Boolean} [route_hide]
   */
  'route_hide'
];

// Possible route_type values, from GTFS reference documentation
// (https://developers.google.com/transit/gtfs/reference):
//
// - 0: Tram, Streetcar, Light rail. Any light rail or street level system
//      within a metropolitan area.
// - 1: Subway, Metro. Any underground rail system within a metropolitan area.
// - 2: Rail. Used for intercity or long-distance travel.
// - 3: Bus. Used for short- and long-distance bus routes.
// - 4: Ferry. Used for short- and long-distance boat service.
// - 5: Cable car. Used for street-level cable cars where the cable runs
//      beneath the car.
// - 6: Gondola, Suspended cable car. Typically used for aerial cable cars
//      where the car is suspended from the cable.
// - 7: Funicular. Any rail system designed for steep inclines.

module.exports = Route;
