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

// Use Backbone models as a lightweight data store: the penalties of holding
// one or two more arrays in memory should be offset by not having to do as
// much setup or initial model processing every time a route changes.
cache.alerts = new Backbone.Model({});
cache.predictions = new Backbone.Model({});
cache.status = new Backbone.Model({});

module.exports = cache;
