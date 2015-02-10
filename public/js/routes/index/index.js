'use strict';

var IndexView = require( './view' );

// Get the (hard-coded) lines collection
var lines = require( '../../data' ).lines;

function homeRoute() {

  new IndexView({
    collection: lines
  });

}

module.exports = homeRoute;
