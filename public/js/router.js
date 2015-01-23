/* global Backbone:false */
'use strict';

var Router = Backbone.Router.extend({

  routes: {
    '':      'home',
    ':line': 'line'
  },

  home: require( './routes/index/route' ),

  line: require( './routes/line/route' )

});

module.exports = new Router();
