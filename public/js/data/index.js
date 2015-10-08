'use strict';

// Optionally pick up on a preloaded data object
var cache = window._data || {};
var Model = require( 'ampersand-model' );
var LinesCollection = require( '../collections/lines' );

cache.lines = new LinesCollection([
  require( './blue' ),
  require( './orange' ),
  require( './red' ),
  require( './green-b' ),
  require( './green-c' ),
  require( './green-d' ),
  require( './green-e' )
]);

// Use AmpersandModel as a client-side data store: the penalties of holding
// one or two more arrays in memory are offset by not having to do as
// much setup or initial model processing every time a route changes.
var LineCache = Model.extend({
  extraProperties: 'allow'
});
cache.alerts = new LineCache({});
cache.predictions = new LineCache({});
cache.status = new LineCache({});

module.exports = cache;
