'use strict';

var Backbone = require( 'backbone' );

var Router = Backbone.Router.extend({

  routes: {
    '':               'index',
    ':line':          'line',
    ':line/:station': 'station'
  },

  index: require( './routes/index' ),

  line: require( './routes/line' ),

  station: require( './routes/station' )

});

module.exports = new Router();
