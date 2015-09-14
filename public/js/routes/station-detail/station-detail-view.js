'use strict';

var _ = {
  filter: require( 'lodash.filter' ),
  first: require( 'lodash.first' ),
  flatten: require( 'lodash.flatten' ),
  groupBy: require( 'lodash.groupby' ),
  map: require( 'lodash.map' ),
  pluck: require( 'lodash.pluck' ),
  sortBy: require( 'lodash.sortby' ),
  union: require( 'lodash.union' ),
  unique: require( 'lodash.uniq' )
};
var bind = require( 'lodash.bind' );
var View = require( 'ampersand-view' );
var stationDetailTemplate = require( './station-detail.tmpl' );
var PredictionListView = require( './trip-predictions-list-view' );
var DirectionPredictionsCollection = require( './collections/direction-predictions' );

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
        // De-dupe IDs to simplify processing of line-terminal stations
        var stopIds = _.unique( _.pluck( this.station.stops, 'id' ) );

        // Get all trips that visit one of this station's stops
        var tripsForStation = this.trips.visitsAny( stopIds );

        // Now that we have the trips, iterate over the stops:
        // Sort by direction (alphabetically)
        var stopsByDirection = _.sortBy( this.station.stops, 'dir' );

        // Get all trips visiting this specific stop & direction (filtering on
        // both is necessary due to terminal stations like Alewife or Bowdoin)
        var tripsForStops = _.map( stopsByDirection, function getsTripsVisiting( stop ) {
          var tripsForStop = _.filter( tripsForStation, function( trip ) {
            return trip.visits( stop.id ) && trip.direction === stop.dir;
          });
          var renderableTrips = _.map( tripsForStop, function createRenderable( trip ) {
            // Produce a renderable object including stop-relative computed properties
            return trip.serializeForStop( stop.id );
          });

          // Return a renderable object
          return {
            dir: stop.dir,
            name: stop.dirName,
            // Sort the created objects by arrival time
            trips: _.sortBy( renderableTrips, 'seconds' )
          };
        });

        // JFK UMass has two platforms, one for Braintree service and one for
        // Ashmont service: to properly account for these, we need to do one
        // final grouping and mapping action to merge the trip lists for
        // different lines running in the same direction
        var directions = _.map( _.groupBy( tripsForStops, 'dir' ), function( group ) {
          var tripsForDirection = _.flatten( _.union( _.pluck( group, 'trips' ) ) );
          var direction = _.first( group );
          return {
            dir: direction.dir,
            name: direction.name,
            trips: tripsForDirection
          };
        });

        return new DirectionPredictionsCollection( directions );
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
    window.tbd = this.tripsByDirection;
  },

  render: function() {
    this.renderWithTemplate( this );

    // Get a reference to the container for the lists of predictions by direction
    this.predictionsLists = this.queryByHook( 'predictions-lists' );

    // Render out a view for each direction
    this.renderCollection( this.tripsByDirection, PredictionListView, this.predictionsLists );
  }
});

module.exports = StationDetailView;
