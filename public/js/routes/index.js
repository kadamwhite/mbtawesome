/* global Backbone:false */
'use strict';

var Router = Backbone.Router.extend({

  routes: {
    '':                 'home',    // base route
    'line/:lineName':   'lineOverview'  // #line/red
  },

  home: require( './home' ),

  lineOverview: require( './line-overview' )

});

module.exports = new Router;
