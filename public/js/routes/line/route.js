'use strict';

var StopsListView = require( './view' );

var Line = require( '../../models/line' );

function lineOverviewRoute( line ) {

  var line = new Line( require( '../../data' ).lines[ line ] );

  new StopsListView({
    model: line
  });

}

module.exports = lineOverviewRoute;
