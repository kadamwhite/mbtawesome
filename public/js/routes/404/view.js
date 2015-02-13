'use strict';

var BaseView = require( '../../views/base-view' );

var IndexView = BaseView.extend({

  el: '.container',

  // Re-use serverside 404 template
  template: require( '../../../../views/partials/404.tmpl' ),

  initialize: function( opts ) {
    // Auto-render
    this.render();
  },

  // This view is model-less, so override BaseView's serialize
  serialize: function() {
    return {};
  }

});

module.exports = IndexView;
