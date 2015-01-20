'use strict';

var $ = require( '../deps' ).jQuery;
var tmplLineOverview = require( '../templates' ).get( 'line-overview' );

function lineOverviewRoute( line ) {
  $( '.container' ).html( tmplLineOverview.render({ title: line + ' line' }) );
  // console.log( 'line overview for ' + line + ' line' );
}

module.exports = lineOverviewRoute;
