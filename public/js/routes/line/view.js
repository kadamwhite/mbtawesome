'use strict';

var Backbone = require( '../../deps' ).Backbone;

var LineView = Backbone.View.extend({
  el: '.container',

  template: require( './tmpl.nunj' ),

  initialize: function() {
    this.listenTo( this.collection, 'sync reset', this.render )
  },

  render: function() {
    var renderedTemplate = this.template.render({
      stops: this.collection.toJSON()
    });
    this.$el.html( renderedTemplate )
    return this;
  },

  events: {
    'click a': 'navigate'
  },

  navigate: function( evt ) {
    evt.preventDefault();

    var targetUrl = this.$( evt.target ).attr( 'href' );

    require( '../../client-app' ).navigate( targetUrl );
  }
});

module.exports = LineView;
