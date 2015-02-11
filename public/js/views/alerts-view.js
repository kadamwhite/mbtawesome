'use strict';

var BaseView = require( './base-view' );

var AlertsView = BaseView.extend({

  template: require( './alerts-view.nunj' ),

  initialize: function() {
    this.listenTo( this.collection, 'sync reset', this.render );

    // Auto-render on load
    this.render();
  },

  serialize: function() {
    return {
      alerts: this.collection.toJSON()
    };
  }

});

module.exports = AlertsView;
