'use strict';

var Backbone = require( 'backbone' );

var TripsCollection = Backbone.Collection.extend({

  initialize: function( arr, opts ) {
    this.line = opts.line;

    if ( ! this.line ) {
      throw new Error( 'TripsCollection requires a line to be specified' );
    }
  },

  model: require( '../models/trip' ),

  url: function() {
    return '/api/v1/lines/' + this.line + '/predictions';
  },

  scheduled: function( stationId ) {
    return this.filter(function( trip ) {
      return trip.visits( stationId ) > 0;
    });
  },

  // Shortcut method to filter collection down to only those trips which
  // will eventually reach the provided station
  approaching: function( stationId ) {
    return this.filter(function( trip ) {
      return trip.approaching( stationId ) > 0;
    });
  }

});

module.exports = TripsCollection;
