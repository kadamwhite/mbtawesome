'use strict';

var express = require( 'express' );
var router = express.Router();
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );

var pageTitle = require( '../services/page-title' );

/* GET home page. */
function homepageRoute( req, res, next ) {
  Promise.props({
    _homepage: true, // Sets H1 in template
    title: pageTitle()
  }).then(function( context ) {
    res.render( 'index', context );
  }).catch( next );
}

module.exports = homepageRoute;
