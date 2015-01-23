'use strict';

var Backbone = require( '../../deps' ).Backbone;

var IndexView = Backbone.View.extend({

  el: '.container',

  template: require( './tmpl.nunj' ),

  initialize: function( opts ) {
    this.listenTo( this.collection, 'sync reset', this.render );
  },

  render: function() {
    var lines = this.collection.toJSON();

    var renderedTemplate = this.template.render({
      line: this.collection.line,
      routes: lines
    });

    this.$el.html( renderedTemplate );

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

module.exports = IndexView;
