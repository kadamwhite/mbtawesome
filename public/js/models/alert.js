/*jshint -W106 */// Disable underscore_case warnings: the API uses them
'use strict';

var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

var Alert = Backbone.Model.extend({

  /**
   * Identify whether this alert is currently in effect, based on effect_periods
   *
   * @method inEffect
   * @return {Boolean} Whether this alert is currently applicable
   */
  inEffect: function() {
    var now = new Date();

    function alertIsActive( effectPeriod ) {
      var start = effectPeriod.effect_start;
      var end = effectPeriod.effect_end;

      // Sometimes alerts don't have a start or end date, meaning they're unbounded:
      // e.g. the 2015 February snow delay alert had effect_end ''.
      var startedInPast = start ? start < now : true;
      var notOverYet = end ? now < end : true;
      return startedInPast && notOverYet;
    }

    // Iterate through effect_periods array to determine status
    return _.any( this.get( 'effect_periods' ), alertIsActive);
  },

  /**
   * Identify whether this alert is for a future date
   *
   * @method upcoming
   * @return {Boolean} Whether this alert is for a future date
   */
  upcoming: function() {
    var now = new Date();

    // Iterate through effect_periods array to determine status
    return _.any( this.get( 'effect_periods' ), function( effectPeriod ) {
      var start = effectPeriod.effect_start;
      // If start time is missing, assume it's in effect now
      return start ? now < start : false;
    });
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
