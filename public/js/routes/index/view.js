'use strict';

var BaseView = require( '../../lib/base-view' );

var IndexView = BaseView.extend({

  el: '.container',

  template: require( './tmpl.nunj' ),

  initialize: function( opts ) {
    // Auto-render, and listen for subsequent changes (there are unlikely to be any)
    this.render().listenTo( this.collection, 'change', this.render );
  },

  serialize: function() {
    return {
      lines: this.collection.toJSON()
    }
  }

});

module.exports = IndexView;
