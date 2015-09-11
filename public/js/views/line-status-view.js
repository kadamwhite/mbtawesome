'use strict';

var bind = require( 'lodash.bind' );
var View = require( 'ampersand-view' );
var lineStatusTemplate = require( './line-status.tmpl' );

var LineStatusView = View.extend({

  autoRender: true,

  props: {
    status: 'model'
  },

  template: bind( lineStatusTemplate.render, lineStatusTemplate ),

  initialize: function() {
    this.listenTo( this.status, 'change', this.render );
  }

});

module.exports = LineStatusView;
