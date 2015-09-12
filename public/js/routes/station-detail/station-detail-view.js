'use strict';

var _ = require( 'lodash' );
var bind = require( 'lodash.bind' );
var View = require( 'ampersand-view' );
var stationDetailTemplate = require( './station-detail.tmpl' );

var StationDetailView = View.extend({

  autoRender: true,

  template: bind( stationDetailTemplate.render, stationDetailTemplate ),

  props: {
    /**
     * @property {LineModel} line
     */
    line: 'model',
    /**
     * Object containing the details about this station
     *
     * @property {Object} station
     */
    station: 'object',
    /**
     * @property {TripsCollection} trips
     */
    trips: 'collection'
  },

  derived: {
    /**
     * A dictionary of trips indexed by GTFS direction identifiers (1/0)
     *
     * @property {Object} tripsByDirection
     */
    tripsByDirection: {
      deps: [ 'station', 'trips' ],
      fn: function() {
        var stopIds = _.pluck( this.station.stops, 'id' );

        // Get all trips that visit one of this station's stops
        var tripsForStation = this.trips.visitsAny( stopIds );

        // Now that we have the trips, iterate over the stops
        return _.chain( this.station.stops )
          // Sort by direction (alphabetically)
          .sortBy( 'dir' )
          // Get all trips visiting this specific stop & direction (filtering on
          // both is necessary due to terminal stations like Alewife or Bowdoin)
          .map(function getsTripsVisiting( stop ) {
            var tripsForStop = _.chain( tripsForStation )
              .filter(function( trip ) {
                return trip.visits( stop.id ) && trip.get( 'direction' ) === stop.dir;
              })
              .map(function createRenderableTrip( trip ) {
                // Use overloaded toJSON to produce a renderable object including
                // relevant computed properties like "active" or "seconds"
                return trip.toJSON( stop.id );
              })
              // Sort the created objects by
              .sortBy( 'seconds' )
              .value();

            // Return a renderable object
            return {
              dir: stop.dir,
              name: stop.dirName,
              trips: tripsForStop
            };
          })
          // JFK UMass has two platforms, one for Braintree service and one for
          // Ashmont service: to properly account for these, we need to do one
          // final grouping and mapping action to merge the trip lists for
          // different lines running in the same direction
          .groupBy( 'dir' )
          .map(function mergeTripsInDirectionGroup( group ) {
            var tripsForDirection = _.chain( group )
              .pluck( 'trips' )
              .union()
              .flatten()
              .value();
            var direction = _.first( group );
            return {
              dir: direction.dir,
              name: direction.dirName,
              trips: tripsForDirection
            };
          })
          .value();
      }
    }
  },

  initialize: function() {
    // Listen for new predictions data
    this.listenTo( this.trips, 'sync reset', this._triggerPredictionsChange );

    // Render when the trips to display change
    this.on( 'change:tripsByDirection', this.render );
  },

  /**
   * Helper method to fire a change event that will trigger derived property recomputation
   *
   * @private
   */
  _triggerPredictionsChange: function() {
    this.trigger( 'change:trips' );
  }
});

module.exports = StationDetailView;
