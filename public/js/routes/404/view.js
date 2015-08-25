'use strict';

var Backbone = require( 'backbone' );

var IndexView = Backbone.View.extend({

  el: '.container',

  // Re-use serverside 404 template
  template: require( '../../../../views/partials/404.tmpl' ),

  initialize: function( opts ) {
    // Auto-render
    this.render();
  },

  render: function() {
    this.$el.html( this.template.render() );
    return this;
  }

});

module.exports = IndexView;
