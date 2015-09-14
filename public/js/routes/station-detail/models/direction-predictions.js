'use strict';

var Model = require( 'ampersand-model' );

var DirectionPredictionsModel = Model.extend({
  props: {
    /**
     * The name of the direction of travel for this prediction
     * @property {String} name
     */
    name: 'string',
    /**
     * The trips going in this direction for which we have predictions
     * @property {Array} trips
     */
    trips: 'array'
  }
});

module.exports = DirectionPredictionsModel;
