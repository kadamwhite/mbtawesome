'use strict';

/**
 * Pluralization utility (adds an "s" to the string for 0 && >1)
 * @param  {String} str   The word to pluralize
 * @param  {Number} count The number of items in a collection
 * @return {String}       Word, contextually appended with "s"
 */
module.exports = function pluralize( str, count ) {
  return count === 1 ? str : str + 's';
};
