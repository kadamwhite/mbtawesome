'use strict';

module.exports = function stringifyFilter( data ) {
  // This filter is bound to `env` when it is require'd
  var safe = this.getFilter( 'safe' );
  return safe( JSON.stringify( data ) );
};
