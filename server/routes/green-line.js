'use strict';

var express = require( 'express' );
var router = express.Router();
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );

var pageTitle = require( '../services/page-title' );
var mbtapi = require( '../services/api' );

function lineOverviewRoute( req, res, next ) {

  // Prime API cache
  mbtapi.alertsByLine( 'green' );

  // Determine the title
  var title = pageTitle([
    'Green Line Overview'
  ]);

  Promise.props({
    title: title
  }).then(function( context ) {
    res.render( 'index', context );
  }).catch( next );
}

module.exports = lineOverviewRoute;
