'use strict';

var express = require( 'express' );
var router = express.Router();

var db = require( '../../services/db' );
var mbtapi = require( '../../services/mbtapi' );

router.get( '/routes', function( req, res ) {
  return db.subwayRoutes().then(function( data ) {
    res.status( 200 ).send( data );
  }).catch(function( err ) {
    res.status( 500 ).send( err );
  });
});

router.get( '/line/:line', function( req, res ) {
  return db.routesByLine( req.params.line ).then(function( data ) {
    res.status( 200 ).send( data );
  }).catch(function( err ) {
    res.status( 500 ).send( err );
  });
});

router.get( '/line/:line/stops', function( req, res ) {
  return mbtapi.stopsByLine( req.params.line ).then(function( data ) {
    res.status( 200 ).send( data );
  }).catch(function( err ) {
    res.status( 500 ).send( err );
  });
});

module.exports = router;
