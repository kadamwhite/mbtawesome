'use strict';

var analytics = require( '../../lib/analytics' );
var pageTitle = require( '../../../../server/services/page-title' );

var IndexView = require( './view' );

// Get the (hard-coded) lines collection
var lines = require( '../../data' ).lines;

module.exports = {
  url: '^/',

  enter: function() {
    new IndexView({
      collection: lines
    });

    analytics.pageView();
  },

  title: pageTitle()
};
