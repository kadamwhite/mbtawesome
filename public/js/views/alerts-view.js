'use strict';

var _ = require( 'lodash' );
var BaseView = require( './base-view' );

var AlertsView = BaseView.extend({

  template: require( './alerts-view.tmpl' ),

  events: {
    'click .alert-list-toggle': 'toggle'
  },

  initialize: function() {
    this.listenTo( this.collection, 'sync reset', this.render );

    // Auto-render on load
    this.render();
  },

  serialize: function() {
    var activeAlerts = this.collection.inEffect();
    return {
      alerts: _.invoke( activeAlerts, 'toJSON' )
    };
  },

  toggle: function() {
    this.$el.toggleClass( 'alert-list-open' );
  }

});

module.exports = AlertsView;
