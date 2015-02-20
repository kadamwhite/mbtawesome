'use strict';

var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

// var statuses = {
//   good: [
//     'The MBTA is doing great today :)',
//     'The T is having a really great day!',
//   ],
//   medium: [
//     'I\'ve seen the T look better in other weather'
//   ],
//   bad: [
//     'The T\'s really not having a very good day :('
//   ]
// };

var LineStatus = Backbone.Model.extend({

  initialize: function( opts ) {
    // this.alerts is an AlertsCollection
    this.alerts = opts.alerts;
    // this.stations is a flat array of stations on this line
    this.stations = opts.stations;
    // this.predictions is a TripsCollection
    this.predictions = opts.predictions;
  },

  /**
   * Get an object containing the number of trains running in each direction,
   * grouped by trip destination (headsign)
   *
   *     // Example output
   *     {
   *       0: [{ headsign: 'Alewife', count: 5 }],
   *       1: [{ headsign: 'Ashmont', count: 1 }, { headsign: 'Braintree', count: 4 }]
   *     }
   *
   * @return {[type]} [description]
   */
  trainsInService: function() {
    return this.predictions.chain()
      // break into groups by direction_id
      .groupBy(function( trip ) {
        return trip.get( 'direction' );
      })
      .mapValues(function( tripsGroup ) {
        // Subdivide each direction group by headsign
        return _.chain( tripsGroup )
          .groupBy(function( trip ) {
            return trip.get( 'headsign' );
          })
          .map(function( group, headsign ) {
            return {
              headsign: headsign,
              count: group.length
            };
          })
          .sortBy( 'headsign' )
          .value();
      })
      .value();
  },

  /**
   * Get the average wait time for each direction of the train
   *
   * TODO: This is slow. Find out why.
   *
   * @method averageWait
   * @return {Object} An object with key-value pairs for wait by direction
   */
  averageWaitTime: function() {
    var predictions = this.predictions;
    // var stopIds = _.pluck( this.stations, 'id' );
    return _.chain( this.stations )
      // Convert each station into an array of ETAs (in seconds) for trips
      // that will reach that station, going either direction
      .map(function( station ) {

        var stopIds = _.pluck( station.stops, 'id' );

        var tripsVisitingStation = predictions.visitsAny( stopIds );

        return _.map( tripsVisitingStation, function( trip ) {
          // console.log( station.name, tripsVisitingStation.length );
          return trip.secondsToAny( stopIds );
        });
      })
      // This has no meaning atm because it is not grouped by direction.
      // FBOFW, we need to group by direction.
      .map(function( tripETAs ) {
        // Figure out the difference in time between each scheduled trip:
        // use a reduce to sum up the time betwen each trip,
        var total = _.reduce( tripETAs, function( memo, eta, idx ) {
          // Figure out the time for the trip preceding this one, if any
          var lastETA = idx > 0 ? tripETAs[ idx - 1 ] : 0;
          var delta = eta - lastETA;
          // Add the new delta to the running total
          return memo + delta;
        }, 0 );

        return total / tripETAs.length;
      })
      .value();
  },

  /**
   * Extend toJSON to include some of the computed properties: if a stopId is
   * provided, "timeUntil", "seconds" and "stop" will all be included
   *
   * Note: this feels janky, toJSON (a) isn't really intended for this and
   * (b) doesn't usually take an argument in this way. TODO: reevaluate.
   *
   * @method toJSON
   * @param {String} [stopId] An optional stop_id string
   */
  toJSON: function( stopId ) {
    var attrs = Backbone.Model.prototype.toJSON.apply( this );

    // Render out computed properties
    attrs.trainsInService = this.trainsInService();
    // attrs.averageWaitTime = this.averageWaitTime();

    // TODO: Should these be set within the view?
    attrs.totalTrainsInService = this.predictions.length;
    attrs.loading = ! this.predictions.loaded;
    attrs.noTrainsInService = attrs.totalTrainsInService === 0;

    return attrs;
  }
});

module.exports = LineStatus;
