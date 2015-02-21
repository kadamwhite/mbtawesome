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
   * Create a dictionary object that can be used to quickly store and look
   * up the wait times for stations
   *
   * Example output:
   *
   *     {
   *       '0': {
   *         name: 'Southbound',
   *         stops: { '70032': [], '70034': [], '70036': [], ... }
   *       },
   *       '1': {
   *         name: 'Northbound',
   *           stops: { '70033': [], '70035': [], '70036': [], ... }
   *         }
   *       }
   *     }
   *
   * @return {Object} Return the dictionary object, once built
   */
  buildStationDictionary: function() {
    // Build the directions dictionary object
    return _.reduce( this.stations, function( directions, station ) {
      /* Station object
      {
        name: 'Wonderland',
        station: 'place-wondl',
        stops: [
          { dir: 0, dirName: 'Westbound', id: '70060' },
          { dir: 1, dirName: 'Eastbound', id: '70060' }
        ]
      }
      */
      // Add this station's stops to the directions dictionary object
      directions = _.reduce( station.stops, function( memo, stop ) {
        // memo[ dirId ] is a dictionary of direction_ids to objects
        memo[ stop.dir ] = memo[ stop.dir ] || {
          name: stop.dirName,
          stops: {}
        };

        // memo[ dirId ].stops[ stopId ] is an array of trips visiting that stopId
        memo[ stop.dir ].stops[ stop.id ] = memo[ stop.dir ].stops[ stop.id ] || [];

        return memo;
      }, directions );

      return directions;
    }, {});
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
    // Local reference to model's TripsCollection instance
    var directions = this.buildStationDictionary();

    window.directions = directions;
    window.ls = this;

    // Iterate through all the predictions, adding each arrival time prediction
    // to the directions dictionary
    this.predictions.forEach(function( trip ) {
      /* Trip object
      {
        'id': '25375441',
        'headsign': 'Ashmont',
        'direction': 0,
        'vehicle': {
          'id': '1855',
          'lat': 42.33022,
          'lon': -71.057,
          'bearing': 175,
          'timestamp': 1424494378
        },
        'stops': [
          { 'id': '70085', 'seq': 13, 'eta': 1424494532, 'seconds': 114 },
          { 'id': '70087', 'seq': 14, 'eta': 1424494678, 'seconds': 260 },
          ...
        ]
      }
      */
      trip.stops().forEach(function( stop ) {
        var dirId = trip.get( 'direction' );
        var stopId = stop.get( 'id' );
        directions[ dirId ].stops[ stopId ].push( stop.get( 'seconds' ) );
      });
    });

    console.log( directions );

    return;

    // return _.chain( this.predictions )
    //   // Convert each station into an array of ETAs (in seconds) for trips
    //   // that will reach that station, going either direction
    //   .map(function( station ) {
    //     console.log( station );
    //     var stopIds = _.pluck( station.stops, 'id' );

    //     var tripsVisitingStation = predictions.visitsAny( stopIds );

    //     return _.map( tripsVisitingStation, function( trip ) {
    //       // console.log( station.name, tripsVisitingStation.length );
    //       return trip.secondsToAny( stopIds );
    //     });
    //   })
    //   // This has no meaning atm because it is not grouped by direction.
    //   // FBOFW, we need to group by direction.
    //   .map(function( tripETAs ) {
    //     // Figure out the difference in time between each scheduled trip:
    //     // use a reduce to sum up the time betwen each trip,
    //     var total = _.reduce( tripETAs, function( memo, eta, idx ) {
    //       // Figure out the time for the trip preceding this one, if any
    //       var lastETA = idx > 0 ? tripETAs[ idx - 1 ] : 0;
    //       var delta = eta - lastETA;
    //       // Add the new delta to the running total
    //       return memo + delta;
    //     }, 0 );

    //     return total / tripETAs.length;
    //   })
    //   .value();
  },

  /**
   * Extend toJSON to include some of the computed properties: if a stopId is
   * provided, 'timeUntil', 'seconds' and 'stop' will all be included
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
    attrs.averageWaitTime = this.averageWaitTime();

    // TODO: Should these be set within the view?
    attrs.totalTrainsInService = this.predictions.length;
    attrs.loading = ! this.predictions.loaded;
    attrs.noTrainsInService = attrs.totalTrainsInService === 0;

    return attrs;
  }
});

module.exports = LineStatus;
