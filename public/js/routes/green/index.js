'use strict';

var $ = require( 'jquery' );
var analytics = require( '../../lib/analytics' );
var pageTitle = require( '../../../../server/services/page-title' );

var GreenLineView = require( './green-line-view' );
var AlertsCollection = require( '../../collections/alerts' );

var data = require( '../../data' );

module.exports = {
  url: '^/green',

  enter: function( lineSlug, parentStation ) {
    var alerts = data.alerts.get( lineSlug );

    if ( ! alerts ) {
      alerts = new AlertsCollection([], {
        line: 'green'
      });
      data.alerts.set( lineSlug, alerts );
    }

    var view = new GreenLineView({
      alerts: alerts
    });
    $( '.container' ).replaceWith( view.el );

    // Kick off alerts data request
    alerts.refresh();

    analytics.pageView();
  },

  title: pageTitle([
    'Green Line Overview'
  ])
};
