'use strict';

var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

var BranchView = require( './branch-view' );
var StationView = require( './station-view' );
var AlertsView = require( '../../views/alerts-view' );
var LineStatusView = require( '../../views/line-status-view' );

var LineOverviewView = Backbone.View.extend({

  el: '.container',

  template: require( './line-overview.tmpl' ),

  initialize: function initializeStationListView( opts ) {
    // Alerts collection, to hand off to a sub-view
    this.alerts = opts.alerts;

    // LineStatus model, to hand off to a sub-view
    this.lineStatus = opts.status;

    // List of stations on this line
    this.line = opts.line;

    // Nested array defining the layout of the stops
    this.stations = this.line.stops;

    this.trips = opts.trips;

    // Listen for new predictions data
    this.listenTo( this.trips, 'sync reset', this.render );

    // Auto-render on load
    this.render();
  },

  render: function renderStationListView() {
    // Subviews are completely re-rendered each time: remove the old ones
    if ( this.subViews ) {
      this.subViews.forEach(function( view ) {
        view.remove();
      });
    }

    // Render the template into the container
    this.$el.html( this.template.render( this.line ) );

    var trips = this.trips;
    var line = this.line;

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
      alerts: this.alerts
    });
    this.$el.find( '.alert-list' ).replaceWith( alertsView.el );

    var lineStatusView = new LineStatusView({
      status: this.lineStatus
    });
    this.$el.find( '.line-status' ).replaceWith( lineStatusView.el );

    subViews.push( alertsView, lineStatusView );

    this.subViews = subViews;

    return this;
  }

});

module.exports = LineOverviewView;
