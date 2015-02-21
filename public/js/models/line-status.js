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

// Utility comparator for use when sorting numeric arrays
function sortNumeric( a, b ) {
  return a - b;
}

// Iterator function for use when summing the values in an array
function sumTimes( sum, timeToTrain ) {
  return sum + timeToTrain;
}

// Utility method for summing and averaging a numeric array
function getAverage( arr ) {
  return Math.ceil( _.reduce( arr, sumTimes, 0 ) / arr.length );
}


// Used by calculateAvgWaitTimes
function getAverageWaitForStop( timesToStop ) {
  // No trains, move along
  if ( ! timesToStop.length ) {
    return;
  }

  // Simple case: only one train
  if ( timesToStop.length === 1 ) {
    return _.first( timesToStop );
  }

  // Sort times in arrival order, low to small
  // Why in seven hells isn't this the default behavior
  var sortedTimes = timesToStop.sort( sortNumeric );

  // Calculate the wait time between each scheduled train
  function calculateWaitTimeIntervals( memo, secondsToTrain, index ) {
    var secondsToPreviousTrain = index > 1 ? sortedTimes[ index - 1 ] : 0;
    memo.push( secondsToTrain - secondsToPreviousTrain );
    return memo;
  }
  var waitTimes = _.reduce( sortedTimes, calculateWaitTimeIntervals, []);

  // Return the average wait time between trains (in seconds)
  return getAverage( waitTimes );
}

// used by updateAverageWaitTimes
function calculateAvgWaitTimes( directionObj ) {
  var averageWaitByStop = _.mapValues( directionObj.stops, getAverageWaitForStop );

  console.log( directionObj.stops );
  console.log( averageWaitByStop );

  return {
    name: directionObj.name,
    stops: averageWaitByStop
  };
}

var LineStatus = Backbone.Model.extend({

  initialize: function initializeLineStatusModel( opts ) {
    // this.alerts is an AlertsCollection
    this.alerts = opts.alerts;
    // this.stations is a flat array of stations on this line
    this.stations = opts.stations;
    // this.predictions is a TripsCollection
    this.predictions = opts.predictions;

    this.listenTo( this.predictions, 'sync reset', this.updateAverageWaitTimes );
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
  trainsInService: function trainsInService() {
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
  buildStationDictionary: function buildStationDictionary() {
    // Iterator function for use in building station dictionary
    function addStopToStationDictionary( memo, station ) {
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
      // memo[ direction_id ] is an object with a name and stops dictionary object
      memo[ station.dir ] = memo[ station.dir ] || {
        name: station.dirName,
        stops: {}
      };

      // memo[ dirId ].stops[ stopId ] is an array of trips visiting that stopId
      memo[ station.dir ].stops[ station.id ] = memo[ station.dir ].stops[ station.id ] || [];

      return memo;
    }

    // Build the directions dictionary object
    return _.reduce( this.stations, function( directions, station ) {
      // Add this station's stops to the directions dictionary object
      directions = _.reduce( station.stops, addStopToStationDictionary, directions );

      return directions;
    }, {});
  },

  /**
   * Get the average wait time for each direction of the train
   *
   * @method averageWait
   * @return {Object} An object with key-value pairs for wait by direction
   */
  updateAverageWaitTimes: function updateAverageWaitTimes() {
    // Local reference to model's TripsCollection instance
    var directions = this.buildStationDictionary();

    // Iterate through all the predictions, adding each arrival time prediction
    // to the directions dictionary
    this.predictions.forEach(function addPredictionsToStationDictionary( trip ) {
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
      trip.stops().forEach(function addTripToStationDictionary( stop ) {
        var dirId = trip.get( 'direction' );
        var stopId = stop.get( 'id' );
        directions[ dirId ].stops[ stopId ].push( stop.get( 'seconds' ) );
      });
    });

    var averageWaitTimeByDirection = _.mapValues( directions, calculateAvgWaitTimes );

    this.set( 'averageWaitTimes', averageWaitTimeByDirection );

    return averageWaitTimeByDirection;
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
    // attrs.averageWaitTime = this.averageWaitTime();

    // TODO: Should these be set within the view?
    attrs.totalTrainsInService = this.predictions.length;
    attrs.loading = ! this.predictions.loaded;
    attrs.noTrainsInService = attrs.totalTrainsInService === 0;

    return attrs;
  }
});

module.exports = LineStatus;
