'use strict';

var $ = require( 'jquery' );
var analytics = require( '../../lib/analytics' );
var pageTitle = require( '../../../../server/services/page-title' );

var Error404View = require( './view' );

module.exports = {
  enter: function() {
    var view = new Error404View();

    $( '.container' ).replaceWith( view.el );

    analytics.pageView();
  },

  title: pageTitle([
    '404: Not Found'
  ])
};
