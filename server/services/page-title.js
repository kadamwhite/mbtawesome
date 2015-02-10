'use strict';

var _ = require( 'lodash' );

function capitalize( str ) {
  return _.map( str.split( ' ' ), function( word ) {
    return word[ 0 ].toUpperCase() + word.slice( 1 );
  }).join( ' ' );
}

function pageTitle( titleComponents ) {
  titleComponents = titleComponents || [];

  // All URLs end "MBTAwesome", because it's awesome!
  titleComponents.push( 'MBTAwesome' );

  // Title-case & add | hierarchy delimiters
  return _.map( titleComponents, function( component ) {
    return capitalize( component.trim() );
  }).join( ' | ' );
}

module.exports = pageTitle;
