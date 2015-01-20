'use strict';

var express = require( 'express' );
var router = express.Router();

/* GET users listing. */
router.get( '/:line', function( req, res ) {
  res.render( 'line-overview.html', {
    title: req.params.line + ' line overview',
    line: {
      name: req.params.line
    }
  });
});

module.exports = router;
