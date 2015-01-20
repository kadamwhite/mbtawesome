'use strict';

var express = require( 'express' );
var router = express.Router();
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );

var mbtapi = require( '../services/mbtapi' );

/* GET users listing. */
router.get( '/:line', function( req, res ) {
  var line = req.params.line;

  var stationStops = mbtapi.stopsByLine( line );

  Promise.props({
    stations: stationStops,
    title: stationStops.then(function( route ) {
      return route.name + ' Overview';
    })
  }).then(function( context ) {
    res.render( 'line-overview.nunj', context );
  });
});

module.exports = router;
