'use strict';

var express = require( 'express' );
var router = express.Router();
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );

var db = require( '../services/db' );

/* GET home page. */
router.get( '/', function( req, res ) {
  Promise.props({
    title: 'MBTAwesome',
    routes: db.subwayRoutes()
  }).then(function( context ) {
    res.render( 'index.nunj', context );
  });
});

module.exports = router;
