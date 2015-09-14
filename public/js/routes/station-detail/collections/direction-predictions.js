'use strict';

var Collection = require( 'ampersand-collection' );
var DirectionPredictionsModel = require( '../models/direction-predictions' );

var DirectionPredictionsCollection = Collection.extend({
  model: DirectionPredictionsModel
});

module.exports = DirectionPredictionsCollection;
