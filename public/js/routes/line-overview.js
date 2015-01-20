'use strict';

var $ = require( '../deps' ).jQuery;
var tmplLineOverview = require( '../templates' ).get( 'line-overview' );

function lineOverviewRoute( line ) {
  var lineObj = window.routes && window.routes[ line ];
  $( '.container' ).html( tmplLineOverview.render({
    title: lineObj.name + ' Overview'
  }) );
  // console.log( 'line overview for ' + line + ' line' );
}

module.exports = lineOverviewRoute;
