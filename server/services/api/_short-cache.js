'use strict';

// Cache
var LRU = require( 'lru-cache' );
var cache = LRU({
  // Store at max 50 items (won't be hit, just a formality)
  max: 50,
  maxAge: 1000 * 15 // refresh every 15 seconds
});

module.exports = cache;
