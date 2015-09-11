'use strict';

var router = require( '../router' );
var BaseView = require( './new-base-view' );

var WindowView = BaseView.extend({

  // Auto-wrapping of links with navigate method
  events: {
    'click a': 'navigate'
  },

  navigate: function( evt ) {
    var $el = this.$( evt.target );
    if ( ! $el.is( 'a' ) ) {
      $el = $el.closest( 'a' );
    }
    var targetUrl = $el.attr( 'href' );

    // Don't hijack any off-site links
    if ( /http/.test( targetUrl ) ) {
      return;
    }

    evt.preventDefault();

    router.nav( targetUrl );
  }

});

module.exports = new WindowView({
  el: document.body
});
