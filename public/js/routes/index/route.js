'use strict';

var _ = require( 'lodash' );

var IndexView = require( './view' );

var LinesCollection = require( '../../collections/lines' );

// Get the hard-coded lines list object, and convert it into an array that
// can be used to instantiate a collection
var lines = new LinesCollection( _.values( require( '../../data' ).lines ) );

function homeRoute() {

  new IndexView({
    collection: lines
  });

}

module.exports = homeRoute;
