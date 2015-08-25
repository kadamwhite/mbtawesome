'use strict';

var _ = require( 'lodash' );
var BaseView = require( '../../views/base-view' );

var StationView = BaseView.extend({

  tagName: 'li',

  className: 'station',

  template: require( './station.tmpl' ),

  initialize: function( opts ) {
    this.station = opts.station;
    // line is a Line instance holding the active line
    this.line = opts.line;
    // trips is the TripsCollection instance holding this line's predictions
    this.trips = opts.trips;
  },

  serialize: function() {
    var stopIds = _.pluck( this.station.stops, 'id' );

    var tripsByDirection = _.chain( this.trips.approachingAny( stopIds ) )
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
          var message = _.chain( stopIds )
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
            scheduled:  ! tripModel.active()
          };
        });
      })
      .value();

    return {
      line: this.line.get( 'slug' ),
      station: this.station,
      directions: tripsByDirection
    };
  }

});

module.exports = StationView;
