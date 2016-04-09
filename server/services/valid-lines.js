'use strict';

var capitalizeFilter = require( '../../views/filters/capitalize' );

/**
 * A list of (lower-cased) line slugs that represent "valid" (supported)
 * MBTA subway routes
 *
 * @property {Array} validLines
 */
var validLines = [
  // "BORG" order is the most amusing, alphabetization be darned
  'blue',
  'orange',
  'red',
  'green',
  'green-b',
  'green-c',
  'green-d',
  'green-e'
];

/**
 * Check whether the provided route_id is not a valid line slug
 *
 * @method invalid
 * @param  {String} routeId The string to check against the list of valid lines
 * @return {Boolean}        Whether or not the route ID provided is valid
 */
function invalid( routeId ) {
  return validLines.indexOf( routeId.toLowerCase() ) < 0;
}

/**
 * Format a string with Initial-Caps so that the MBTAPI will recognize it
 *
 * @param  {String} routeId A route ID with uNknown-capitalization
 * @return {String}         A route ID that is Properly-Formatted
 */
function format( routeId ) {
  return routeId
    .toLowerCase()
    .split( '-' )
    .map( capitalizeFilter )
    .join( '-' );
}

module.exports = {
  list: validLines,
  greenLineRoutes: [ 'Green-B', 'Green-C', 'Green-D', 'Green-E' ],
  invalid: invalid,
  format: format
};
