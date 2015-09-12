'use strict';

var lodash = require( 'lodash' );
var _ = {
  map: require( 'lodash.map' ),
  pluck: require( 'lodash.pluck' )
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
        return _.pluck( this.station.stops, 'id' );
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
            return _.map( trips, function( tripModel ) {
              // trips.approaching doesn't maintain association b/w the trip and the
              // actual station_id of the station it is approaching: Check each of
              // the station IDs associated with this view to get the message. (only
              // one of them will be valid, hence the .without('').first()).
              var message = lodash.chain( stopIds )
                .map(function( stopId ) {
                  return tripModel.messageForStation( stopId );
                })
                .without( '' )
                .first()
                .value();

              return {
                // Message to display as hover text
                message: message,
                // Return whether the train is scheduled
                scheduled:  tripModel.scheduled
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
