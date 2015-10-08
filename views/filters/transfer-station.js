'use strict';

/**
 * Augment the link to a transfer line with the path to the relevant station
 *
 * @param {String} line    The input string
 * @param {String} station The parent_station to which to link
 * @return {String}        The path to that station on the relevant line, or to
 *                         the line root if it is the green line
 */
module.exports = function transferStation( line, station ) {
  if ( line === 'green' ) {
    return 'green';
  }
  return [ line, station ].join( '/' );
};
