'use strict';

var IndexView = require( './view' );

// Get the (hard-coded) lines collection
var lines = require( '../../data' ).lines;
var setTitle = require( '../../lib/set-title' );

function homeRoute() {

  new IndexView({
    collection: lines
  });

  // Reset title to "MBTAwesome" home page default
  setTitle();

}

module.exports = homeRoute;
