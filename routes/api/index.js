'use strict';

var express = require( 'express' );
var router = express.Router();

var mbtapi = require( '../../services/mbtapi' );

router.get( '/routes', function( req, res ) {
  return mbtapi.subwayRoutes().then(function( data ) {
    res.status( 200 ).send( data );
  }).catch(function( err ) {
    res.status( 500 ).send( err );
  });
});

router.get( '/line/:line', function( req, res ) {
  return mbtapi.routesByLine( req.params.line ).then(function( data ) {
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
