'use strict';

/**
 * Filter to support quickly checking if a line slug matches one of our
 * supported lines (i.e., lines for which we have routes)
 *
 * @param  {String} line A line slug, e.g. "red"
 * @return {Boolean} Whether that line slug matches a supported line
 */
module.exports = function isLineSupported( line ) {
  return [ 'blue', 'orange', 'red', 'green' ].indexOf( line ) >= 0;
};
