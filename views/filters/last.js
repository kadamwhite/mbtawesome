'use strict';

/**
 * Naive last-in-array filter method
 * @param  {Array} arr An array from which to return the last item
 * @return             The last item in the provided array, or undefined
 */
module.exports = function last( arr ) {
  if ( ! arr || ! arr.length ) {
    return;
  }
  return arr[ arr.length - 1 ];
};
