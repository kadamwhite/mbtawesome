'use strict';

var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

var statuses = {
  good: [
    'The MBTA is doing great today :)',
    'The T is having a really great day!',
  ],
  medium: [
    'I\'ve seen the T look better in other weather'
  ],
  bad: [
    'The T\'s really not having a very good day :('
  ]
};

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
   * Get the average wait time for each direction of the train
   *
   * @method averageWait
   * @return {Object} An object with key-value pairs for wait by direction
   */
  // averageWaitTime: function() {
  //   var predictions = this.predictions;
  //   var stopIds = _.pluck( this.stations, 'id' );
  //   return _.map( this.predictions.visitsAny( stopIds ), function( trip ) {
  //     var trainsVisitingStation = predictions.visits( station.id );
  //     var timeToStation = _.map( trainsVisitingStation, function( trip ) {
  //       return trip.visits( station.id );
  //     });
  //     return {
  //       station: station.name,
  //       visiting: trainsVisitingStation,
  //       timeToStation: timeToStation
  //     };
  //   });
  // }
});

module.exports = LineStatus;
