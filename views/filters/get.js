'use strict';

module.exports = function getProp( obj, key ) {
  if ( obj.get && typeof obj.get === 'function' ) {
    return obj.get( key );
  }
  return obj[ key ];
};
