'use strict';

var IndexView = require( './view' );

var LinesCollection = require( '../../collections/lines' );

function homeRoute() {
  var lines = new LinesCollection();

  new IndexView({
    collection: lines
  });

  lines.fetch();
}

module.exports = homeRoute;
