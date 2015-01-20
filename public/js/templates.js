'use strict';

// var VIEWS_DIR = '../../views/partials/';

// function getView( templateName ) {
//   return require( VIEWS_DIR + templateName );
//   // return require( '../../views/partials/home.nunj' );
// }

var views = {
  'home.nunj': require( '../../views/partials/home.nunj' ),
  'line-overview.nunj': require( '../../views/partials/line-overview.nunj' )
};

function getAndCache( templateName ) {
  // Look up the template
  var template = views[ templateName + '.nunj' ];

  // Check the template cache
  if ( template ) {
    return template;
  }
  // views[ templateName ] = template = getView( templateName );
  // return template;
}

module.exports = {
  get: getAndCache
};
