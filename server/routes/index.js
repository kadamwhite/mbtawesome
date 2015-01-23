'use strict';

var express = require( 'express' );
var router = express.Router();

router.get( '/', require( './homepage' ) );
router.get( '/:line', require( './line-overview' ) );

module.exports = router;
