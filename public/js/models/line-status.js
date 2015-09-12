'use strict';

var lodash = require( 'lodash' );
var _ = {
  filter: require( 'lodash.filter' ),
  first: require( 'lodash.first' ),
  mapValues: require( 'lodash.mapvalues' ),
  reduce: require( 'lodash.reduce' )
};
var Model = require( 'ampersand-model' );

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

// Helpers
// ==============================================
// (These methods do not need to be stored on the
// model prototype)

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
  // Filter out undefined values: we use a separate metric for handling those
  var arrValues = _.filter( arr );
  return Math.ceil( _.reduce( arrValues, sumTimes, 0 ) / arrValues.length );
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
    var secondsToPreviousTrain = index > 0 ? sortedTimes[ index - 1 ] : 0;
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

  return {
    name: directionObj.name,
    wait: Math.ceil( getAverage( averageWaitByStop ) / 60 )
  };
}

// Iterator function for use in building station dictionary
function addStopToStationDictionary( memo, station ) {
  /* Station object:
  {
    name: 'Wonderland',
    station: 'place-wondl',
    stops: [
      { dir: 0, dirName: 'Westbound', id: '70060' }
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

// Model Definition
// ==============================================

var LineStatus = Model.extend({

  // All members are stored as props, not collections or children, because none
  // of the three approaches proxy the collection events through to this model
  // and both collections and children instantiate a new instance of the provided
  // collection rather than re-using the instance that is passed in. We manually
  // trigger change events in the initialize method in order to get updates to
  // these collections to trigger derived property updates.
  props: {
    /**
     * @property {AlertsCollection} alerts A rest collection of alerts for this line
     */
    alerts: 'collection',
    /**
     * @property {TripsCollection} predictions A trip predictions collection for this line
     */
    predictions: 'collection',
    /**
     * @property {Array} stations Flat array of the station objects in this line
     */
    stations: 'array'
  },

  derived: {
    /**
     * An object with the count of trains in service in each direction, grouped
     * by trip destination (headsign)
     *
     *     // Example output
     *     {
     *       0: [{ headsign: 'Alewife', count: 5 }],
     *       1: [{ headsign: 'Ashmont', count: 1 }, { headsign: 'Braintree', count: 4 }]
     *     }
     *
     * @property {Object} trainsInService
     */
    trainsInService: {
      deps: [ 'predictions' ],
      fn: function() {
        return lodash.chain( this.predictions.models )
          // break into groups by direction_id
          .groupBy( 'direction' )
          .mapValues(function( tripsGroup ) {
            // Subdivide each direction group by headsign
            return lodash.chain( tripsGroup )
              .groupBy( 'headsign' )
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
      }
    },

    /**
     * How many trains are currently tracked OR scheduled on this line
     *
     * @property {Number} totalTrainsInService
     */
    totalTrainsInService: {
      deps: [ 'predictions' ],
      fn: function() {
        return this.predictions.length;
      }
    },

    /**
     * Whether no trains are currently in service
     *
     * @property {Boolean} noTrainsInService
     */
    noTrainsInService: {
      deps: [ 'totalTrainsInService' ],
      fn: function() {
        return this.totalTrainsInService === 0;
      }
    },

    /**
     * A dictionary object that can be used to quickly store and look
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
     * @method buildStationDictionary
     * @private
     * @return {Object} Return the dictionary object, once built
     */
    stationDictionary: {
      deps: [ 'stations' ],
      fn: function() {
        // Build the directions dictionary object
        return _.reduce( this.stations, function( directions, station ) {
          // Add this station's stops to the directions dictionary object
          directions = _.reduce( station.stops, addStopToStationDictionary, directions );

          return directions;
        }, {});
      }
    },

    /**
     * An object with key-value pairs for average wait time by direction
     *
     * @property {Object} averageWaitTimes
     */
    averageWaitTimes: {
      deps: [ 'predictions', 'stationDictionary' ],
      fn: function() {
        // In-scope reference to model's station dictionary object
        var directions = this.stationDictionary;

        // Iterate through all the predictions, adding each arrival time prediction
        // to the directions dictionary
        this.predictions.forEach(function addPredictionsToStationDictionary( trip ) {
          /* Trip object
          {
            'id': '25375441',
            'headsign': 'Ashmont',
            'direction': 0,
            'stops': [
              { 'id': '70085', 'seq': 13, 'eta': 1424494532, 'seconds': 114 },
              ...
            ]
          }
          */
          trip.stops.forEach(function addTripToStationDictionary( stop ) {
            if ( ! stop.seconds ) {
              // TODO: Figure out why one of these is empty after ampersand migration
              return;
            }
            var dirId = trip.direction;
            var stopId = stop.id;
            directions[ dirId ].stops[ stopId ].push( stop.seconds );
          });
        });

        // Average wait time by direction
        return _.mapValues( directions, calculateAvgWaitTimes );
      }
    },

    loading: {
      deps: [ 'predictions' ],
      fn: function() {
        return ! this.predictions.loaded;
      }
    }
  },

  initialize: function( opts ) {
    // Allow collection changes to trigger derived property regeneration
    this.listenTo( this.predictions, 'sync reset add remove', this._triggerPredictionsChange );
  },

  /**
   * Helper method to fire a change event that will trigger derived property recomputation
   *
   * @private
   */
  _triggerPredictionsChange: function() {
    this.trigger( 'change:predictions' );
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
    return this.getAttributes({
      props: true,
      derived: true
    });
  }
});

module.exports = LineStatus;
