'use strict';

var Backbone = require( 'backbone' );

var AlertsView = Backbone.View.extend({
  el: '.alerts',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.empty()
    return this;
  }
});

module.exports = AlertsView;
