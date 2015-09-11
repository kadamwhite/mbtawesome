'use strict';

var View = require( 'ampersand-view' );
var lineStatusTemplate = require( './line-status.tmpl' );

var LineStatusView = View.extend({

  autoRender: true,

  props: {
    status: 'model'
  },

  template: lineStatusTemplate.render.bind( lineStatusTemplate ),

  initialize: function() {
    this.listenTo( this.status, 'change', this.render );
  }

});

module.exports = LineStatusView;
