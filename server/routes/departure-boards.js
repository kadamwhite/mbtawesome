'use strict';

var express = require( 'express' );
var router = express.Router();
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );

var pageTitle = require( '../services/page-title' );

function aboutRoute( req, res, next ) {

  // Determine the title
  var title = pageTitle([
    'Station Departure Boards'
  ]);

  Promise.props({
    title: title
  }).then(function( context ) {
    res.render( 'departure-boards', context );
  }).catch( next );
}

module.exports = aboutRoute;
