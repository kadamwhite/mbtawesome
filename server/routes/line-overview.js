'use strict';

var express = require( 'express' );
var router = express.Router();
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );

var db = require( '../services/db' );

function lineOverviewRoute( req, res ) {
  var line = req.params.line;

  var title = db.routesByLine( line ).then(function( route ) {
    return route.name + ' Overview | MBTAwesome';
  });

  Promise.props({
    stops: db.stopsByLine( line ),
    title: title
  }).then(function( context ) {
    res.render( 'line-overview.nunj', context );
  });
}

module.exports = lineOverviewRoute;
