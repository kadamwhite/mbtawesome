'use strict';

var express = require( 'express' );
var router = express.Router();
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );

var mbtapi = require( '../services/mbtapi' );

/* GET home page. */
router.get( '/', function( req, res ) {
  Promise.props({
    title: 'MBTAwesome',
    routes: mbtapi.subwayRoutes()
  }).then(function( context ) {
    res.render( 'index.nunj', context );
  });
});

module.exports = router;
