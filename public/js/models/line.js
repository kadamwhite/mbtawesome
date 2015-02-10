'use strict';

var Backbone = require( 'backbone' );

// var StopsCollection = require( '../collections/stops' );

var Line = Backbone.Model.extend({
  // Don't make an API request for this: it's basically static data
  initialize: function( props, opts ) {
    // Promote "stops" to a StopsCollection
    // this.set( 'stops', new StopsCollection( this.get( 'stops' ) ) );
  },

  stops: function() {
    return this.get( 'stops' );
  }

});

module.exports = Line;
