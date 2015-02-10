'use strict';

var Backbone = require( 'backbone' );

var LinesCollection = Backbone.Collection.extend({

  model: require( '../models/line' ),

  bySlug: function( lineSlug ) {
    return this.findWhere({
      slug: lineSlug
    });
  }

  // No URL: this data is present in the DB, but loaded from static JS files
  // to maximize performance and cacheability (new stations open very rarely)

});

module.exports = LinesCollection;
