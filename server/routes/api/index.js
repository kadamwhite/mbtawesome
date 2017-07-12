'use strict';

var express = require( 'express' );
var router = express.Router();

var mbtapi = require( '../../services/api' );

router.get( '/lines/:line/predictions', function( req, res ) {
  mbtapi.predictionsByLine( req.params.line ).then(function( data ) {
    // predictions use short-cache, which re-fetches data every 15s
    res.setHeader( 'Cache-Control', 'public, max-age=15' );
    res.status( 200 ).json( data );
  }).catch(function( err ) {
    console.error( err );
    res.status( 500 ).json( err.message );
  });
});

router.get( '/lines/:line/alerts', function( req, res ) {
  mbtapi.alertsByLine( req.params.line ).then(function( data ) {
    // alerts use long-cache, which re-fetches every minute
    res.setHeader( 'Cache-Control', 'public, max-age=60' );
    res.status( 200 ).json( data );
  }).catch(function( err ) {
    console.error( err );
    res.status( 500 ).json( err.message );
  });
});

router.get( '/departure-board', function( req, res ) {
  mbtapi.departureBoard().then(function( csv ) {
    res.setHeader( 'Cache-Control', 'public, max-age=15' );
    res.status( 200 ).send( csv );
  }).catch(function( err ) {
    console.error( err );
    res.status( 500 ).json( err.message );
  });
});

module.exports = router;
