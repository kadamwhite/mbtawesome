'use strict';

var express = require( 'express' );
var router = express.Router();

// var db = require( '../../services/db' );
var mbtapi = require( '../../services/api' );

// router.get( '/lines', function( req, res ) {
//   return db.subwayRoutes().then(function( data ) {
//     res.status( 200 ).json( data );
//   }).catch(function( err ) {
//     console.error( err );
//     res.status( 500 ).json( err.message );
//   });
// });

// router.get( '/lines/:line', function( req, res ) {
//   return db.routesByLine( req.params.line ).then(function( data ) {
//     res.status( 200 ).json( data );
//   }).catch(function( err ) {
//     console.error( err );
//     res.status( 500 ).json( err.message );
//   });
// });

// router.get( '/lines/:line/stops', function( req, res ) {
//   return db.stopsByLine( req.params.line ).then(function( data ) {
//     res.status( 200 ).json( data );
//   }).catch(function( err ) {
//     console.error( err );
//     res.status( 500 ).json( err.message );
//   });
// });

router.get( '/lines/:line/predictions', function( req, res ) {
  mbtapi.predictionsByLine( req.params.line ).then(function( data ) {
    res.status( 200 ).json( data );
  }).catch(function( err ) {
    console.error( err );
    res.status( 500 ).json( err.message );
  });
});

module.exports = router;
