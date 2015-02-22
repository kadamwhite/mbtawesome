'use strict';

/**
 * Filter to support quickly checking if a line slug matches one of our
 * supported lines (i.e., lines for which we have routes)
 *
 * @param  {String} line A line slug, e.g. "red"
 * @return {Boolean} Whether that line slug matches a supported line
 */
module.exports = function isLineSupported( line ) {
  return line === 'blue' || line === 'orange' || line === 'red' || line === 'green';
};
