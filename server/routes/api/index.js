'use strict';

var express = require( 'express' );
var router = express.Router();

var mbtapi = require( '../../services/api' );

router.get( '/lines/:line/predictions', function( req, res ) {
  mbtapi.predictionsByLine( req.params.line ).then(function( data ) {
    res.status( 200 ).json( data );
  }).catch(function( err ) {
    console.error( err );
    res.status( 500 ).json( err.message );
  });
});

router.get( '/lines/:line/alerts', function( req, res ) {
  mbtapi.alertsByLine( req.params.line ).then(function( data ) {
    res.status( 200 ).json( data );
  }).catch(function( err ) {
    console.error( err );
    res.status( 500 ).json( err.message );
  });
});

module.exports = router;
