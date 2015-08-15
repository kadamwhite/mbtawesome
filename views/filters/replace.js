'use strict';

/**
 * Replace one string with another in the provided input
 * @param {String} str     The input string
 * @param {String} fromStr The string in the input to search for
 * @param {String} toStr   The string to insert in place of fromStr
 * @return {String}        str, with instances of fromStr replaced with toStr
 */
module.exports = function replace( str, fromStr, toStr ) {
  return str.replace( fromStr, toStr );
};
