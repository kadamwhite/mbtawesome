'use strict';

var $ = require( '../deps' ).jQuery;
var tmplHome = require( '../templates' ).get( 'home' );

function homeRoute() {
  var routes = window.routes;
  $( '.container' ).html( tmplHome.render({
    title: 'MBTAwesome',
    routes: routes
  }) );
}

module.exports = homeRoute;
