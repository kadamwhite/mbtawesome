'use strict';

var Backbone = require( 'backbone' );

var WindowView = Backbone.View.extend({
  el: 'body',

  // Auto-wrapping of links with navigate method
  events: {
    'click a': 'navigate'
  },

  navigate: function( evt ) {
    var targetUrl = this.$( evt.target ).attr( 'href' );

    // Don't hijack any off-site links
    if ( /http/.test( targetUrl ) ) {
      return;
    }

    evt.preventDefault();

    require( '../router' ).goTo( targetUrl );
  }

});

module.exports = new WindowView();
