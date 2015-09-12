'use strict';

var lodash = require( 'lodash' );
var _ = {
  first: require( 'lodash.first' ),
  groupBy: require( 'lodash.groupby' ),
  map: require( 'lodash.map' ),
  mapValues: require( 'lodash.mapvalues' ),
  pluck: require( 'lodash.pluck' ),
  unique: require( 'lodash.uniq' ),
  without: require( 'lodash.without' )
};
var bind = require( 'lodash.bind' );
var View = require( 'ampersand-view' );
var stationTemplate = require( './station.tmpl' );

var StationView = View.extend({

  autoRender: true,

  tagName: 'li',

  className: 'station',

  template: bind( stationTemplate.render, stationTemplate ),

  props: {
    /**
     * @property {Object} station
     */
    station: 'object',
    /**
     * @property {LineModel} line
     */
    line: 'model',
    /**
     * @property {TripsCollection} trips
     */
    trips: 'collection'
  },

  derived: {
    stopIds: {
      deps: [ 'station' ],
      fn: function() {
        return _.unique( _.pluck( this.station.stops, 'id' ) );
      }
    },
    tripsByDirection: {
      deps: [ 'trips', 'stopIds' ],
      fn: function() {
        var stopIds = this.stopIds;
        return lodash.chain( this.trips.approachingAny( stopIds ) )
          .groupBy(function( trip ) {
            return trip.get( 'direction' );
          })
          .mapValues(function( trips ) {
            // Bake the trip objects down to the minimum values needed to render
            return _.map( trips, function( trip ) {
              // trips.approaching doesn't maintain association b/w the trip and the
              // actual station_id of the station it is approaching: Check each of
              // the station IDs associated with this view to get the message.
              var messages = _.map( stopIds, function( stopId ) {
                return trip.messageForStation( stopId );
              });

              // For line-terminal stations with only one stop_id, there will only
              // be one message: assume this as the easy case
              var message = messages[ 0 ];

              // If there is more than one message string, one of them will be '': get
              // one that is not empty (if we have it already, do nothing).
              if ( messages.length > 1 && message === '' ) {
                // JFK/UMass has 4 stopIds, other stations have 2; so rather than
                // special-case those IDs, if we didn't luck out and get a trip where
                // the first message was the string, just prune the empty ones and
                // get what's left (there should only ever be one non-empty string)
                message = _.without( messages, '' )[ 0 ];
              }

              return {
                // Message to display as hover text
                message: message,
                // Return whether the train is scheduled
                scheduled:  trip.scheduled
              };
            });
          })
          .value();
      }
    }
  },

  initialize: function() {
    this.listenTo( this.trips, 'sync reset', bind(function() {
      this.trigger( 'change:trips' );
      this.render();
    }, this ));
  }

});

module.exports = StationView;
