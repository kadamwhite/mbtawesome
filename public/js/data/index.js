'use strict';

// Optionally pick up on a preloaded data object
var cache = window._data || {};

cache.lines = {
  blue: {
    name: 'Blue Line',
    stops: require( './blue' )
  },
  orange: {
    name: 'Orange Line',
    stops: require( './orange' )
  },
  red: {
    name: 'Red Line',
    stops: require( './red' )
  }
};

module.exports = cache;
