'use strict';

var express = require( 'express' );
var router = express.Router();

router.use( '/', require( './homepage' ) );
router.use( '/line', require( './line-overview' ) );

module.exports = router;
