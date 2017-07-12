var d3 = require('d3');

d3.csv( '/api/v1/departure-board', function( err, res ) {
  if ( err ) {
    console.error( err );
    return;
  }
  console.log(res);
});
