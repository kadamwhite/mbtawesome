'use strict';

var _ = require( 'lodash' );

/**
 * Make a collection of Backbone models renderable by recursively running
 * toJSON on any models nested inside the provided array
 *
 * @method renderable
 * @param {Array} collection An array with Backbone models
 * @return {Array} An array with raw JavaScript objects
 */
function renderable( collection ) {
  return _.map( collection, function( obj ) {
    if ( _.isFunction( obj.toJSON ) ) {
      return obj.toJSON();
    }
    if ( _.isArray( obj ) ) {
      return renderable( obj );
    }
    return obj;
  });
}

module.exports = renderable;
