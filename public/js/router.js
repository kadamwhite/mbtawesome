'use strict';

var Backbone = require( 'backbone' );

var Router = Backbone.Router.extend({

  routes: {
    '':      'home',
    ':line': 'line'
  },

  home: require( './routes/index' ),

  line: require( './routes/line' )

});

module.exports = new Router();
