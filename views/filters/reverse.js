'use strict';

/**
 * Reverse an array
 * @param  {Array} arr An array to reverse
 * @return {Array}     The array, reversed
 */
module.exports = function reverse( arr ) {
  if ( ! arr || ! arr.length ) {
    return [];
  }
  return arr.reverse();
};
