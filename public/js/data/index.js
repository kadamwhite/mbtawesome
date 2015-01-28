'use strict';

// Optionally pick up on a preloaded data object
var cache = window._data || {};

cache.lines = {
  blue: require( './blue' ),
  orange: require( './orange' ),
  red: require( './red' )
};

module.exports = cache;
