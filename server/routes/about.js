'use strict';

var express = require( 'express' );
var router = express.Router();
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );

var pageTitle = require( '../services/page-title' );
var mbtapi = require( '../services/api' );

function aboutRoute( req, res, next ) {

  // Determine the title
  var title = pageTitle([
    'About'
  ]);

  Promise.props({
    title: title
  }).then(function( context ) {
    res.render( 'index', context );
  }).catch( next );
}

module.exports = aboutRoute;
