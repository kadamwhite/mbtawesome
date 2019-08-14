'use strict';

// Cache
var LRU = require( 'lru-cache' );
var cache = new LRU({
  // Store at max 50 items (won't be hit, just a formality)
  max: 50,
  maxAge: 1000 * 60 * 2 // refresh every 2 minutes
});

module.exports = cache;
