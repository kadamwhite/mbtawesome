'use strict';

var Backbone = require( 'backbone' );

var Stops = Backbone.Collection.extend({
  model: require( '../models/stop' ),

  initialize: function( arr, opts ) {
    this.line = opts.line;
  },

  url: function() {
    return [ '/api/v1/lines', this.line, 'stops' ].join( '/' );
  }
});

module.exports = Stops;
