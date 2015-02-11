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
    // this.stations is an array of stations on this line
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
  averageWaitTime: function() {}
});

module.exports = LineStatus;
