'use strict';

var bind = require( 'lodash.bind' );
var _ = {
  filter: require( 'lodash.filter' )
};
var jQueryView = require( './jq-view' );
var alertsTemplate = require( './alerts-view.tmpl' );

var AlertsView = jQueryView.extend({

  autoRender: true,

  template: bind( alertsTemplate.render, alertsTemplate ),

  events: {
    'click .alert-list-toggle': 'toggle'
  },

  props: {
    alerts: 'collection'
  },

  derived: {
    alertsInEffect: {
      deps: [ 'alerts' ],
      fn: function() {
        return _.filter( this.alerts.models, 'inEffect' );
      }
    }
  },

  initialize: function() {
    this.listenTo( this.alerts, 'sync reset', bind(function() {
      // Force-update derived property when "alerts" changes: derived props do
      // not update automatically based on collection events
      this.trigger( 'change:alerts' );

      // Render on change
      this.render();
    }, this ));
  },

  toggle: function() {
    this.$el.toggleClass( 'alert-list-open' );
  }

});

module.exports = AlertsView;
