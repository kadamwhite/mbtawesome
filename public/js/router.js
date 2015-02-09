'use strict';

var Backbone = require( 'backbone' );

var Router = Backbone.Router.extend({

  routes: {
    '':      'home',
    ':line': 'line'
  },

  home: require( './routes/index/route' ),

  line: require( './routes/line/route' )

});

module.exports = new Router();