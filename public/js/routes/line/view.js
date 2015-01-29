'use strict';

var BaseView = require( '../../lib/base-view' );

var LineView = BaseView.extend({

  el: '.container',

  template: require( './tmpl.nunj' ),

  initialize: function() {
    // Auto-render, and listen for subsequent changes
    this.render().listenTo( this.model, 'change', this.render );
  }

});

module.exports = LineView;
