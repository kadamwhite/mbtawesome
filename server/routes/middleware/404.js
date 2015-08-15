'use strict';

// Send the 404 in the appropriate response type
function handle404( req, res, next ) {
  res.status(404);

  var message = 'Not Found';

  // respond with html page
  if ( req.accepts( 'html' ) ) {
    return res.render( '404' );
  }

  // respond with json
  if ( req.accepts( 'json' ) ) {
    return res.send({
      error: 'Not Found'
    });
  }

  // respond with plain text
  res.type( 'txt' ).send( message );
};

module.exports = handle404;
