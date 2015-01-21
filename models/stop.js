'use strict';

var BaseModel = require( './base-model' );

var Stop = BaseModel.extend({
  tableName: 'stops',
  route: function() {
    return this.belongsToMany( require( './route' ) );
  }
});

// TODO: Implement a custom save method on BaseModel to white-list
// only the fields appearing in a models' `.fields` array
Stop.fields = [
  /**
   * Incrementing primary key
   * @property {Number} id
   */
  'id',

  /**
   * Foreign key to a Route object
   */
  'route_id',

  /**
   * GTFS-compatible direction identifier for the route to which this stop belongs
   * @example 0
   * @property {Number} direction_id
   */
  'direction_id',

  /**
   * The human-readable name for the direction of the route containing this stop
   * @example "Southbound"
   * @property {String} direction_name
   */
  'direction_name',

  /**
   * Identifies where the stop comes in the order of stops for this route and direction
   * (not guaranteed to be unique)
   * @example 1
   * @property {Number} stop_order
   */
  'stop_order',

  /**
   * The GTFS-compatible unique identifier for the stop
   * @example "70061"
   * @property {String} stop_id
   */
  'stop_id',

  /**
   * The GTFS-compatible name for the stop (not unique)
   * @example "Alewife Station Red Line"
   * @property {String} stop_name
   */
  'stop_name',

  /**
   * The GTFS-compatible unique identifier for the station associated with the stop
   * (can be empty if stop does not have an associated station)
   * @example "place-alfcl"
   * @property {String} [parent_station]
   */
  'parent_station',

  /**
   * The human-readable name for the larger station associated with the stop
   * (can be empty if stop does not have an associated station)
   * @example "Alewife Station"
   * @property {String} [parent_station_name]
   */
  'parent_station_name',

  /**
   * The GTFS-compatible latitude of the station
   * @example 42.3954277038574
   * @property {Number} stop_lat
   */
  'stop_lat',

  /**
   * The GTFS-compatible longitude of the station
   * @example -71.1424865722656
   * @property {Number} stop_lon
   */
  'stop_lon'
];

module.exports = Stop;
