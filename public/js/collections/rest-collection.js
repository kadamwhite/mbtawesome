'use strict';

// Take Ampersand's base collection,
var Collection = require( 'ampersand-collection' );
var bind = require( 'lodash.bind' );
// And add the REST Mixin
var restMixins = require( 'ampersand-collection-rest-mixin' );

// Export a custom collection constructor with a self-throttling refresh method
module.exports = Collection.extend( restMixins, {

  session: {
    lastRefreshed: 'number',
    pendingRequest: 'object'
  },

  refresh: function() {
    var now = Date.now();

    // Don't make another request if one is already active
    if ( this.pendingRequest ) {
      return this.pendingRequest;
    }

    // If we updated less than 20 seconds ago, don't fetch new data
    if ( this.lastRefreshed && this.lastRefreshed > now - 1000 * 20 ) {
      return this.pendingRequest;
    }

    // We updated more than 20 seconds ago: get new data from the API
    this.lastRefreshed = now;
    // Use a session property to indicate whether a request is pending
    this.pendingRequest = this.fetch({
      always: bind( function() {
        this.pendingRequest = null;
      }, this )
    });

    return this.pendingRequest;
  }
});
