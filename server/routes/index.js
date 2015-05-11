'use strict';

var express = require( 'express' );
var router = express.Router();

router.get( '/bus/:route', require( './eightyeight' ) );
router.get( '/', require( './homepage' ) );
router.get( '/green', require( './green-line' ) );
router.get( '/:line', require( './line-overview' ) );
router.get( '/:line/:station', require( './station-detail' ) );

router.use( require( './middleware/404' ) );

module.exports = router;
