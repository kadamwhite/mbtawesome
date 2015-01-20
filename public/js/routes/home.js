'use strict';

var $ = require( '../deps' ).jQuery;
var tmplHome = require( '../templates' ).get( 'home' );

function homeRoute() {
  $( '.container' ).html( tmplHome.render({ title: 'test' }) );
  // console.log( require( '../templates' ).home({ title: 'test' }) );
}

module.exports = homeRoute;
