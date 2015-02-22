'use strict';

var GreenLineView = require( './green-line-view' );
var AlertsCollection = require( '../../collections/alerts' );

var data = require( '../../data' );
var setTitle = require( '../../lib/set-title' );

function greenLineRoute( lineSlug, parentStation ) {
  /* jshint validthis: true */

  var alerts = data.alerts.get( lineSlug );
  if ( ! alerts ) {
    alerts = new AlertsCollection([], {
      line: 'green'
    });
    data.alerts.set( lineSlug, alerts );
  }

  new GreenLineView({
    alerts: alerts
  });

  setTitle([
    'Green Line Overview'
  ]);

  // Kick off alerts data request
  alerts.refresh();

}

module.exports = greenLineRoute;
