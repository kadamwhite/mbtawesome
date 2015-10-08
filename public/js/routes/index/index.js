'use strict';

var $ = require( 'jquery' );
var analytics = require( '../../lib/analytics' );
var pageTitle = require( '../../../../server/services/page-title' );

var IndexView = require( './view' );

module.exports = {
  url: '^/',

  enter: function() {
    var view = new IndexView();
    $( '.container' ).replaceWith( view.el );

    analytics.pageView();
    window.scrollTo( 0, 0 );
  },

  title: pageTitle()
};
