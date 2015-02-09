'use strict';

var _ = require( 'lodash' );

function getTripsFromRoute( route ) {
  // Iterate through directions within a route
  return _.map( route.direction, function getTripsFromDirection( direction ) {
    var directionName = direction.direction_name;

    // Iterate through trips on this direction
    return _.map( direction.trip, function cleanTrips( trip ) {
      // Simplify basic trip value keys
      var tripObj = {
        id: trip.trip_id,
        // name: trip.trip_name,
        headsign: trip.trip_headsign,
        direction: directionName
      };

      // Simplify vehicle data value keys
      if ( trip.vehicle ) {
        tripObj.vehicle = _.reduce( trip.vehicle, function cleanVehicles( vehicle, val, key ) {
          if ( key === 'vehicle_id' ) {
            // Don't coerce ID, just in case
            vehicle.id = val;
            return vehicle;
          }
          // Convert all other properties into Numbers (API provides strings)
          vehicle[ key.replace( 'vehicle_', '' ) ] = +val;
          return vehicle;
        }, {});
      }

      // Simplify stop data objects
      tripObj.stops = _.map( trip.stop, function cleanStops( stop ) {
        return {
          id: stop.stop_id,
          // // Scheduled arrival & departure (seconds)
          // schArr: stop.sch_arr_dt,
          // schDep: stop.sch_dep_dt,
          // Estimated time of arrival at station (seconds)
          eta: +stop.pre_dt,
          // Seconds until train arrives
          seconds: +stop.pre_away
        }
      });

      return tripObj;
    });

  });
}

function getTripsFromRoutes( routes ) {
  return _.chain( routes )
    .map( getTripsFromRoute )
    .flatten()
    .value();
}

module.exports = getTripsFromRoutes;
