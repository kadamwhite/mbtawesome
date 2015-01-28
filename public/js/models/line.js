'use strict';

var Backbone = require( 'backbone' );

var StopsCollection = require( '../collections/stops' );

var Line = Backbone.Model.extend({
  // Don't make an API request for this: it's basically static data
  // initialize: function( opts ) {
  //   console.log( opts );
  // }
  stops: function() {
    return new StopsCollection( this.get( 'stops' ) );
  }
});

module.exports = Line;
