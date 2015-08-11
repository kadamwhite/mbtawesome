'use strict';

var analytics = require( '../../lib/analytics' );
var pageTitle = require( '../../../../server/services/page-title' );

var Error400View = require( './view' );

module.exports = {
  enter: function() {
    new Error400View();

    analytics.pageView();
  },

  title: pageTitle([
    '404: Not Found'
  ])
};
