'use strict';

var express = require( 'express' );
var router = express.Router();

var db = require( '../../services/db' );

router.get( '/routes', function( req, res ) {
  return db.subwayRoutes().then(function( data ) {
    res.status( 200 ).send( data );
  }).catch(function( err ) {
    res.status( 500 ).send( err );
  });
});

router.get( '/routes/:line', function( req, res ) {
  return db.routesByLine( req.params.line ).then(function( data ) {
    res.status( 200 ).send( data );
  }).catch(function( err ) {
    res.status( 500 ).send( err );
  });
});

router.get( '/routes/:line/stops', function( req, res ) {
  return db.stopsByLine( req.params.line ).then(function( data ) {
    res.status( 200 ).send( data );
  }).catch(function( err ) {
    res.status( 500 ).send( err );
  });
});

module.exports = router;
