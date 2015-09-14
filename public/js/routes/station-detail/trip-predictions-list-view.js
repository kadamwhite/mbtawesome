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
    },
    moreTripsAvailable: {
      deps: [ 'trips' ],
      fn: function() {
        return this.trips.length > 2;
      }
    },
    tripsPreview: {
      deps: [ 'trips' ],
      fn: function() {
        return this.trips.slice( 0, 2 );
      }
    }
  },

  session: {
    /**
     * Whether the list of predictions is expanded (view state property)
     *
     * @type {String} expanded
     */
    expanded: 'boolean'
  },

  events: {
    'click .toggle': 'toggleListExpansion'
  },

  toggleListExpansion: function() {
    this.expanded = ! this.expanded;
  },

  initialize: function() {
    this.on( 'change:expanded', this.render );
  }

});

module.exports = PredictionsListView;
