/*jshint -W106 */// Disable underscore_case warnings: the API uses them
'use strict';

var _ = require( 'lodash' );
var Model = require( 'ampersand-model' );

var Alert = Model.extend({

  props: {
    // alert_id: 'number', // e.g. 90418
    // banner_text: 'string', // Short notices about serious issues
    effect_name: 'string', // e.g. "Shuttle"
    // effect: 'string', // e.g. "DETOUR"
    // cause_name: 'string', // e.g. "construction"
    // cause: 'string', // e.g. "CONSTRUCTION"
    header_text: 'string', // e.g. "Buses replacing Red Line service..."
    // short_header_text: 'string', // abbreviated form of header_text
    // description_text: 'string', // Long-form description
    severity: 'string', // e.g. "Minor", "Severe"
    // created_dt: 'string',
    // last_modified_dt: 'string',
    // service_effect_text: 'string', // e.g. "Change at Downtown Crossing"
    // timeframe_text: 'string', // e.g. "ongoing", "this weekend"
    // alert_lifecycle: 'string', // e.g. "Upcoming", "Ongoing"
    // affected_services: 'object',
    effect_periods: 'array'
  },

  derived: {
    /**
     * Whether this alert is currently applicable
     *
     * @property {Boolean} inEffect
     */
    inEffect: {
      deps: [ 'effect_periods' ],
      fn: function() {
        var now = new Date();

        // Iterate through effect_periods array to determine status
        return _.any( this.effect_periods, function( effectPeriod ) {
          // Convert this effect period's start and end values (epoch time in seconds,
          // represented as strings) into JS Dates, providing that the value is present.
          // Sometimes alerts don't have a start or end date, meaning they're unbounded:
          // e.g. the 2015 February snow delay alert had effect_end ''.
          var start = effectPeriod.effect_start && new Date( 1000 * effectPeriod.effect_start );
          var end = effectPeriod.effect_end && new Date( 1000 * effectPeriod.effect_end );

          // Use those start and end values to reason about the alert: the ternary
          // accounts for the unbounded alert periods (as detailed above)
          var startedInPast = start ? start < now : true;
          var notOverYet = end ? now < end : true;

          // If both conditions are satisfied, this effect period is current
          return startedInPast && notOverYet;
        });
      }
    },

    /**
     * Whether this alert is for a future date
     *
     * @property {Boolean} upcoming
     */
    upcoming: {
      deps: [ 'effect_periods' ],
      fn: function() {
        var now = new Date();

        // Iterate through effect_periods array to determine status
        return _.any( this.effect_periods, function( effectPeriod ) {
          var start = effectPeriod.effect_start;
          // If start time is missing, assume it's in effect now
          return start ? now < start : false;
        });
      }
    }
  }

});

module.exports = Alert;
