'use strict';

var $ = require( 'jquery' );
var View = require( 'ampersand-view' );

var BaseView = View.extend({

  derived: {
    '$el': {
      deps: [ 'el' ],
      fn: function() {
        if ( this.el ) {
          return $( this.el )
        };
      }
    },
  },

  $: function( selector ) {
    return $( selector, this.el );
  }
});

module.exports = BaseView;
