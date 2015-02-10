'use strict';

var _ = require( 'lodash' );
var StationView = require( '../line/station-view' );

var StopsListView = StationView.extend({

  el: '.container',

  template: require( './station-detail.nunj' ),

  initialize: function( opts ) {
    // Nested array defining the layout of the stops
    this.station = opts.station;

    this.line = opts.line;

    // Listen for new predictions data
    this.listenTo( this.collection, 'sync reset', this.render );

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
    var predictions = this.collection;
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
          direction: stop.direction
        });
        return {
          direction: stop.direction,
          name: stop.dirName,
          trips: trips
        };
      })
      .sortBy( 'direction' )
      .value();

    return {
      station: this.station,
      line: this.line,
      directions: directions
    };
  }

  // render: function() {
  //   // Render the template into the container
  //   this.$el.html( this.template.render( this.serialize() ) );

  //   var trips = this.collection;

  //   // Build an array of subviews (StationView or BranchView)
  //   var subViews = _.map( this.stations, function( station ) {
  //     if ( ! _.isArray( station ) ) {
  //       // Non-array station gets rendered as-is
  //       return new StationView({
  //         station: station,
  //         collection: trips
  //       });
  //     }

  //     // If station is an array, we're branching:
  //     return new BranchView({
  //       branches: station,
  //       collection: trips
  //     });
  //   });

  //   // Render subviews into the parent element
  //   this.$el.find( '.stations' ).append( _.map( subViews, function( subView ) {
  //     return subView.render().el;
  //   }));

  //   return this;
  // }

});

module.exports = StopsListView;
