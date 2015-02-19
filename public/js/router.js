'use strict';

var Backbone = require( 'backbone' );

var analytics = require( './lib/analytics' );

var Router = Backbone.Router.extend({

  routes: {
    '':               'index',
    ':line':          'line',
    ':line/:station': 'station',
    '*notFound':      'error404'
  },

  index: require( './routes/index' ),

  line: require( './routes/line' ),

  station: require( './routes/station' ),

  error404: require( './routes/404' ),

  // Convenience wrapper for navigation (always sets { trigger: true })
  goTo: function( target ) {
    this.navigate( target, {
      trigger: true
    });
    analytics.pageView();
  }

});

module.exports = new Router();
