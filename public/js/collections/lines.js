'use strict';

var Collection = require( 'ampersand-collection' );

var LinesCollection = Collection.extend({

  model: require( '../models/line' )

  // No URL: this data is loaded from static JS files to maximize cacheability
  // (new MBTA stations open very rarely)

});

module.exports = LinesCollection;
