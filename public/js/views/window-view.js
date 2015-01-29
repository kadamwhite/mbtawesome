'use strict';

var Backbone = require( 'backbone' );

var WindowView = Backbone.View.extend({
  el: 'body',

  // Auto-wrapping of links with navigate method
  events: {
    'click a': 'navigate'
  },

  navigate: function( evt ) {
    evt.preventDefault();

    var targetUrl = this.$( evt.target ).attr( 'href' );

    require( '../client-app' ).navigate( targetUrl );
  }

});

module.exports = new WindowView();
