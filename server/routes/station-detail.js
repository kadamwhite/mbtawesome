'use strict';

var express = require( 'express' );
var router = express.Router();
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );

var pageTitle = require( '../services/page-title' );
var mbtapi = require( '../services/api' );

function stationDetailRoute( req, res, next ) {
  var line = req.params.line;

  // Prime API cache
  mbtapi.predictionsByLine( line );

  // 404 handled on the client (where the dictionary of page titles lives)

  // Title placeholder (title also set on client)
  // TODO (long term): Get the station name from the DB
  var title = pageTitle([
    'Station Detail',
    line + ' Line'
  ]);

  Promise.props({
    title: title
  }).then(function( context ) {
    res.render( 'station-detail.nunj', context );
  }).catch( next );
}

module.exports = stationDetailRoute;
