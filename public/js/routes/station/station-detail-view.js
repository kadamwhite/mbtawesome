'use strict';

var _ = require( 'lodash' );
var StationView = require( '../line/station-view' );

var StopsListView = StationView.extend({

  el: '.container',

  template: require( './station-detail.nunj' ),

  initialize: function( opts ) {
    // Nested array defining the layout of the stops
    this.station = opts.station;

    // this.line is a Line model instance
    this.line = opts.line;

    // this.collection is a TripsCollection instance:
    this.predictions = opts.predictions;

    // Listen for new predictions data
    this.listenTo( this.predictions, 'sync reset', this.render );

    // Auto-render on load
    this.render();
  },

  /**
   * Convenience method to get any predictions in the view's collection
   * that visit stops contained within this view's parent station
   *
   * @method scheduled
   * @return {Array} Array of Trip models
   */
  scheduled: function() {
    var predictions = this.predictions;
    return _.chain( this.stations() )
      .map(function( stop ) {
        // Get all trips visiting this stop, and set a property
        // containing the message to be displayed
        return _.chain( predictions.scheduled( stop.id ) )
          .map(function( trip ) {
            var tripObj = trip.toJSON();
            // For grouping
            tripObj.stop = stop.id;
            // For display
            tripObj.timeUntil = trip.timeUntil( stop.id );
            tripObj.scheduled = ! trip.active();
            // For sorting
            tripObj.seconds = trip.visits( stop.id );
            return tripObj;
          })
          .sortBy( 'seconds' )
          .value();
      })
      .flatten()
      .value();
  },

  serialize: function() {
    var predictions = this.scheduled();

    var directions = _.chain( this.station.stops )
      .map(function( stop ) {
        var trips = _.where( predictions, {
          direction: stop.dir
        });
        return {
          direction: stop.dir,
          name: stop.dirName,
          trips: trips
        };
      })
      .sortBy( 'direction' )
      .value();

    return {
      station: this.station,
      line: this.line.get( 'slug' ),
      directions: directions
    };
  }

});

module.exports = StopsListView;
