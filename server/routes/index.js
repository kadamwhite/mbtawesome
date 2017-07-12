'use strict';

var express = require( 'express' );
var router = express.Router();

router.get( '/', require( './homepage' ) );
router.get( '/about', require( './about' ) );
router.get( '/green', require( './green-line' ) );
router.get( '/:line', require( './line-overview' ) );
router.get( '/:line/:station', require( './station-detail' ) );
router.get( '/:departure-boards', require( './departure-boards' ) );

// Handle 404's

router.use( require( './middleware/404' ) );

module.exports = router;
