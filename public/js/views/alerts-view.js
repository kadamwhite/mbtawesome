'use strict';

var BaseView = require( './base-view' );

var AlertsView = BaseView.extend({

  template: require( './alerts-view.nunj' ),

  events: {
    'click .alert-list-toggle': 'toggle'
  },

  initialize: function() {
    this.listenTo( this.collection, 'sync reset', this.render );

    // Auto-render on load
    this.render();
  },

  serialize: function() {
    return {
      alerts: this.collection.toJSON()
    };
  },

  toggle: function() {
    this.$el.toggleClass( 'alert-list-open' );
  }

});

module.exports = AlertsView;
