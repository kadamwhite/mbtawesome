'use strict';

var BaseView = require( './base-view' );

var LineStatusView = BaseView.extend({

  template: require( './line-status.tmpl' ),

  initialize: function() {
    this.listenTo( this.model, 'change', this.render );

    // Auto-render on load
    this.render();
  }

});

module.exports = LineStatusView;
