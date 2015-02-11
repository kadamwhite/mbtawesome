/*jshint -W106 */// Disable underscore_case warnings: the API uses them
'use strict';

var Backbone = require( 'backbone' );

var Alert = Backbone.Model.extend({

  /**
   * Get a Date object representing when this alert goes into effect
   *
   * @method effectStart
   * @return {Date} The JS date object representing when the alert starts
   */
  effectStart: function() {
    // API times are in seconds
    return new Date( this.get( 'effect_periods' ).effect_start * 1000 );
  },

  /**
   * Get a Date object representing when this alert ends
   *
   * @method effectEnd
   * @return {Date} The JS date object representing when the alert ends
   */
  effectEnd: function() {
    // API times are in seconds
    return new Date( this.get( 'effect_periods' ).effect_end * 1000 );
  },

  /**
   * Identify whether this alert is currently in effect, based on effect_periods
   *
   * @method inEffect
   * @return {Boolean} Whether this alert is currently applicable
   */
  inEffect: function() {
    var now = new Date();
    return this.effectStart() < now && now < this.effectEnd();
  },

  /**
   * Identify whether this alert is for a future date
   *
   * @method upcoming
   * @return {Boolean} Whether this alert is for a future date
   */
  upcoming: function() {
    var now = new Date();
    return now < this.effectStart();
  },

  /**
   * Convenience method to get the description
   *
   * @return {String} The header text description for the error
   */
  description: function() {
    return this.get( 'header_text' );
  },

  /**
   * Get the alert's Banner (short notices about serious issues), if applicable
   *
   * @method banner
   * @return {String} The banner_text of the alert, if any
   */
  banner: function() {
    return this.get( 'banner_text' );
  }

});

module.exports = Alert;
