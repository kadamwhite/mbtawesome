'use strict';

var $ = require( 'jquery' );
var analytics = require( '../../lib/analytics' );
var pageTitle = require( '../../../../server/services/page-title' );

var AboutView = require( './view' );

module.exports = {
  url: '^/about',

  enter: function() {
    var view = new AboutView();
    $( '.container' ).replaceWith( view.el );

    analytics.pageView();
    window.scrollTo( 0, 0 );
  },

  title: pageTitle()
};
