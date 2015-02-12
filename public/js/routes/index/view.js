'use strict';

var BaseView = require( '../../views/base-view' );

var IndexView = BaseView.extend({

  el: '.container',

  template: require( './index.tmpl' ),

  initialize: function( opts ) {
    // Auto-render, and listen for subsequent changes (there are unlikely to be any)
    this.render().listenTo( this.collection, 'change', this.render );
  },

  serialize: function() {
    return {
      lines: this.collection.toJSON()
    };
  }

});

module.exports = IndexView;
