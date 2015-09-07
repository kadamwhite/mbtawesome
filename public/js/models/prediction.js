'use strict';

var Model = require( 'ampersand-model' );

// Predictions model structures the "stops" property of a Trip model.
// Each entry in the "stops" array has properties "id", "eta" and "seconds",
// e.g. `{ id: '70087', eta: 1423524933, seq: 210, seconds: 136 }`.
var PredictionModel = Model.extend({
  props: {
    /**
     * The epoch time (in seconds) at which this trip is scheduled to arrive at the station
     * @property {Number} eta
     */
    eta: 'number',

    /**
     * The GTFS ID of a station at which this trip will stop
     * @property {String} id
     */
    id: 'string',

    /**
     * The number of seconds until this trip is scheduled to arrive
     * @property {Number} seconds
     */
    seconds: 'number',

    /**
     * The sequence order in which this station occurs within the line
     * @property {Number} seq
     */
    seq: 'number'
  }
});

module.exports = PredictionModel;
