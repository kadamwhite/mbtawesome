'use strict';

var Error400View = require( './view' );

// Get the (hard-coded) lines collection
var setTitle = require( '../../lib/set-title' );

function homeRoute() {

  new Error400View();

  setTitle([
    '404: Not Found'
  ]);

}

module.exports = homeRoute;
