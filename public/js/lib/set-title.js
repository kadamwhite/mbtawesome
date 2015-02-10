'use strict';

// Code re-use woo!
var pageTitle = require( '../../../server/services/page-title' );

/**
 * Update the title of the page to reflect the provided route data
 * @method setTitle
 * @param {Array} titleComponents An array of strings to assemble into the page title
 */
function setTitle( titleComponents ) {
  var title = pageTitle( titleComponents );
  document.title = title;
}

module.exports = setTitle;
