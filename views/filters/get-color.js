'use strict';

/**
 * Get the color out of a line slug
 * @param {String} str     The input string, e.g. "red" or "green-c"
 * @return {String}        The part of the input string preceeding any "-"
 */
module.exports = function getColor( str ) {
  return str.split( '-' )[ 0 ];
};
