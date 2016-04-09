'use strict';

var express = require( 'express' );
var router = express.Router();
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );

var pageTitle = require( '../services/page-title' );
var mbtapi = require( '../services/api' );
var validLines = require( '../services/valid-lines' );

function lineOverviewRoute( req, res, next ) {
  var line = req.params.line;

  // 404 early if we're not requesting a "valid" line
  if ( validLines.invalid( line ) ) {
    return next();
  }

  // Prime API cache
  mbtapi.alertsByLine( line );
  mbtapi.predictionsByLine( line );

  // Determine the title
  var title = pageTitle([
    line + ' Line Overview'
  ]);

  Promise.props({
    title: title
  }).then(function( context ) {
    res.render( 'index', context );
  }).catch( next );
}

module.exports = lineOverviewRoute;
