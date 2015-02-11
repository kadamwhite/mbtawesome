'use strict';

// Optionally pick up on a preloaded data object
var cache = window._data || {};
var Backbone = require( 'backbone' );
var LinesCollection = require( '../collections/lines' );

cache.lines = new LinesCollection([
  require( './blue' ),
  require( './orange' ),
  require( './red' )
]);

cache.alerts = new Backbone.Model({});
cache.predictions = new Backbone.Model({});

module.exports = cache;
