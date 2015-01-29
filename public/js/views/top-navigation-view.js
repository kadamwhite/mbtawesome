'use strict';

var Backbone = require( 'backbone' );

var TopNavigationView = Backbone.View.extend({
  el: '.top-nav',

  // Auto-wrapping of links with navigate method
  events: {
    'click .site-title': 'home'
  },

  home: function() {
    require( '../client-app' ).navigate( '/' );
  }

});

module.exports = new TopNavigationView();
