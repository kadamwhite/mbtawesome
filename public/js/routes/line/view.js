'use strict';

var _ = require( 'lodash' );
var BaseView = require( '../../views/base-view' );

var BranchView = require( './branch-view' );
var StationView = require( './station-view' );
var AlertsView = require( '../../views/alerts-view' );

// Takes both a model and a collection
var StopsListView = BaseView.extend({

  el: '.container',

  template: require( './tmpl.nunj' ),

  initialize: function( opts ) {
    // Alerts collection, to hand off to a sub-view
    this.alerts = opts.alerts;

    // Nested array defining the layout of the stops
    this.stations = this.model.stops();

    // Listen for new predictions data
    this.listenTo( this.collection, 'sync reset', this.render );

    // Auto-render on load
    this.render();
  },

  render: function() {
    // Render the template into the container
    this.$el.html( this.template.render( this.serialize() ) );

    var trips = this.collection;
    var lineSlug = this.model.get( 'slug' );

    // Build an array of subviews (StationView or BranchView)
    var subViews = _.map( this.stations, function( station ) {
      if ( ! _.isArray( station ) ) {
        // Non-array station gets rendered as-is
        return new StationView({
          line: lineSlug,
          station: station,
          collection: trips
        });
      }

      // If station is an array, we're branching:
      return new BranchView({
        line: lineSlug,
        branches: station,
        collection: trips
      });
    });

    // Render subviews into the parent element
    this.$el.find( '.stations' ).append( _.map( subViews, function( subView ) {
      return subView.render().el;
    }));

    var alertsView = new AlertsView({
      collection: this.alerts,
      el: '.alert-list'
    });

    subViews.push( alertsView );

    this.subViews = subViews;

    return this;
  }

});

module.exports = StopsListView;
