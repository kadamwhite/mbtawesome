'use strict';

var $ = require( 'jquery' );
var analytics = require( '../../lib/analytics' );
var pageTitle = require( '../../../../server/services/page-title' );

var GreenLineView = require( './green-line-view' );

module.exports = {
  url: '^/green',

  enter: function() {

    var view = new GreenLineView();
    $( '.container' ).replaceWith( view.el );

    analytics.pageView();
    window.scrollTo( 0, 0 );
  },

  title: pageTitle([
    'Green Line Overview'
  ])
};
