'use strict';

var express = require( 'express' );
var router = express.Router();
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );

var pageTitle = require( '../services/page-title' );
var mbtapi = require( '../services/api' );
var validLines = require( '../services/valid-lines' );

function stationDetailRoute( req, res, next ) {
  var line = req.params.line;

  // 404 early if we're not requesting a "valid" line
  if ( validLines.invalid( line ) ) {
    return next();
  }
  // 404 client-side if the station doesn't find a match

  // Prime API cache
  mbtapi.predictionsByLine( line );

  // Title placeholder (title also set on client)
  // TODO (long term): Get the station name from the DB
  var title = pageTitle([
    'Station Detail',
    line + ' Line'
  ]);

  Promise.props({
    title: title
  }).then(function( context ) {
    res.render( 'index', context );
  }).catch( next );
}

module.exports = stationDetailRoute;
