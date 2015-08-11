'use strict';

var StateManager = require( 'stateman' );

var router = new StateManager({
  title: 'MBTAwesome'
});

router.state({
  'home': require( './routes/index' ),
  'green': require( './routes/green' ),
  'line': require( './routes/line' ),
  'station': require( './routes/station' ),
  '$notfound': require( './routes/404' )
});

module.exports = router;
