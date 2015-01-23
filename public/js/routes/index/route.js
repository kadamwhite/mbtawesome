'use strict';

var Backbone = require( '../../deps' ).Backbone;

var IndexView = require( './view' );

var Line = Backbone.Model.extend({});

var LinesCollection = Backbone.Collection.extend({
  model: Line,
  url: '/api/v1/lines'
});

function homeRoute() {
  var lines = new LinesCollection();

  var indexView = new IndexView({
    collection: lines
  });

  lines.fetch();
}

module.exports = homeRoute;
