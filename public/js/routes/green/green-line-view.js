'use strict';

var BaseView = require( '../../views/base-view' );
var AlertsView = require( '../../views/alerts-view' );

var GreenLineView = BaseView.extend({

  el: '.container',

  template: require( './green-line.tmpl' ),

  initialize: function initializeGreenLineView( opts ) {
    // Object containing the system alerts for this line
    this.alerts = opts.alerts;

    // Auto-render on load
    this.render();
  },

  // This view is model-less, so override BaseView's serialize
  render: function renderGreenLineView() {
    // Render the static content
    this.$el.html( this.template.render() );

    var alertsView = new AlertsView({
      collection: this.alerts,
      el: '.alert-list'
    });

    alertsView.listenTo( this.alerts, 'sync reset', alertsView.render );

    this.alertsView = alertsView;

    return this;
  }

});

module.exports = GreenLineView;
