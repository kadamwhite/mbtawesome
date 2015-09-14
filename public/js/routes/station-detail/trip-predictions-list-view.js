'use strict';

var bind = require( 'lodash.bind' );
var jQueryView = require( '../../views/jq-view' );
var predictionsListTemplate = require( './trip-predictions-list.tmpl' );

var PredictionsListView = jQueryView.extend({

  autoRender: true,

  template: bind( predictionsListTemplate.render, predictionsListTemplate ),

  // Use derived properties to keep template cleaner
  derived: {
    name: {
      deps: [ 'model.name' ],
      fn: function() {
        return this.model.name;
      }
    },
    trips: {
      deps: [ 'model.trips' ],
      fn: function() {
        return this.model.trips;
      }
    }
  }

});

module.exports = PredictionsListView;
