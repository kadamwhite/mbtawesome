'use strict';

/**
 * Convert a string to lower-case
 * @param {String} str The input string
 * @return {String}    The string lower-cased
 */
module.exports = function lowerCase( str ) {
  if ( typeof str !== 'string' ) {
    return '';
  }
  return str.toLowerCase();
};
