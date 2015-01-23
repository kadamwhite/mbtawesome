'use strict';

var Backbone = require( 'backbone' );

var LinesCollection = Backbone.Collection.extend({
  model: require( '../models/line' ),
  url: '/api/v1/lines'
});

module.exports = LinesCollection;
