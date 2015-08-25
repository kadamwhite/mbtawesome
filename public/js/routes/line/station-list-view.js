'use strict';

var _ = require( 'lodash' );
var BaseView = require( '../../views/base-view' );

var BranchView = require( './branch-view' );
var StationView = require( './station-view' );
var AlertsView = require( '../../views/alerts-view' );
var LineStatusView = require( '../../views/line-status-view' );

// Takes both a model and a collection
var StopsListView = BaseView.extend({

  el: '.container',

  template: require( './station-list.tmpl' ),

  initialize: function initializeStationListView( opts ) {
    // Alerts collection, to hand off to a sub-view
    this.alerts = opts.alerts;

    // LineStatus model, to hand off to a sub-view
    this.lineStatus = opts.status;

    // Nested array defining the layout of the stops
    this.stations = this.model.stops();

    // Listen for new predictions data
    this.listenTo( this.collection, 'sync reset', this.render );

    // Auto-render on load
    this.render();
  },

  render: function renderStationListView() {
    // Render the template into the container
    this.$el.html( this.template.render( this.serialize() ) );

    var trips = this.collection;
    var line = this.model;

    // Build an array of subviews (StationView or BranchView)
    function createStationOrBranchView( station ) {
      if ( ! _.isArray( station ) ) {
        // Non-array station gets rendered as-is
        return new StationView({
          line: line,
          station: station,
          trips: trips
        });
      }

      // If station is an array, we're branching:
      return new BranchView({
        line: line,
        branches: station,
        trips: trips
      });
    }
    var subViews = _.map( this.stations, createStationOrBranchView );

    // Render subviews into the parent element
    function renderStationView( subView ) {
      return subView.render().el;
    }
    this.$el.find( '.stations' ).append( _.map( subViews, renderStationView ) );

    var alertsView = new AlertsView({
      collection: this.alerts,
      el: '.alert-list'
    });

    var lineStatusView = new LineStatusView({
      stations: this.stations,
      model: this.lineStatus,
      el: '.line-status'
    });

    subViews.push( alertsView, lineStatusView );

    this.subViews = subViews;

    return this;
  }

});

module.exports = StopsListView;
