'use strict';

var express = require( 'express' );
var router = express.Router();
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );

var pageTitle = require( '../services/page-title' );
var mbtapi = require( '../services/api' );

function lineOverviewRoute( req, res, next ) {
  var line = req.params.line;

  // Prime API cache
  mbtapi.predictionsByLine( line );

  // 404 early if we're not requesting a "valid" line
  // (Green gets its own template, because it is SO AWESOME)
  if ( [ 'red', 'orange', 'blue' ].indexOf( line ) < 0 ) {
    next();
  }

  // Determine the title
  var title = pageTitle([
    line + ' Line Overview'
  ]);

  Promise.props({
    title: title
  }).then(function( context ) {
    res.render( 'layouts/main.tmpl', context );
  }).catch( next );
}

module.exports = lineOverviewRoute;
