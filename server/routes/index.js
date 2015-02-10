'use strict';

var express = require( 'express' );
var router = express.Router();

router.get( '/', require( './homepage' ) );
router.get( '/:line', require( './line-overview' ) );
router.get( '/:line/:station', require( './station-detail' ) );

module.exports = router;
