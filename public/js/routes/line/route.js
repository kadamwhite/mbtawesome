'use strict';

var StopsListView = require( './view' );

var Line = require( '../../models/line' );

function lineOverviewRoute( lineSlug ) {

  var line = new Line( require( '../../data' ).lines[ lineSlug ] );

  new StopsListView({
    model: line
  });

}

module.exports = lineOverviewRoute;
