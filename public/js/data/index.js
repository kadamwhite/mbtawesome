'use strict';

// Optionally pick up on a preloaded data object
var cache = window._data || {};
var StateObj = require( 'ampersand-state' );
var LinesCollection = require( '../collections/lines' );

cache.lines = new LinesCollection([
  require( './blue' ),
  require( './orange' ),
  require( './red' )
]);

// Use State object as a client-side data store: the penalties of holding
// one or two more arrays in memory are offset by not having to do as
// much setup or initial model processing every time a route changes.
var LineCache = StateObj.extend({
  props: {
    blue: 'object',
    orange: 'object',
    red: 'object',
    green: 'object'
  }
});
cache.alerts = new LineCache({});
cache.predictions = new LineCache({});
cache.status = new LineCache({});

module.exports = cache;
