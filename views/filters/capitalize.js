'use strict';

/**
 * Capitalize the first letter of each word in the input string
 * @param {String} str The input string
 * @return {String}    The string, capitalized (prob should do this in CSS...?)
 */
module.exports = function capitalize( str ) {
  var words = str.split( ' ' );
  return words.map(function( word ) {
    return word.charAt( 0 ).toUpperCase() + word.slice( 1 );
  }).join( ' ' );
};
