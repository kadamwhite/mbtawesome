'use strict';

var Backbone = require( 'backbone' );

var AlertsView = Backbone.View.extend({

  template: require( './alerts-view.tmpl' ),

  events: {
    'click .alert-list-toggle': 'toggle'
  },

  initialize: function() {
    this.listenTo( this.collection, 'sync reset', this.render );

    // Auto-render on load
    this.render();
  },

  render: function() {
    this.$el.html( this.template.render({
      alerts: this.collection.filter( 'inEffect' ),
      loading: ! this.collection.loaded
    }));
  },

  toggle: function() {
    this.$el.toggleClass( 'alert-list-open' );
  }

});

module.exports = AlertsView;
