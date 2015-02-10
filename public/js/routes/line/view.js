'use strict';

var _ = require( 'lodash' );
var BaseView = require( '../../views/base-view' );

var BranchView = require( './branch-view' );
var StationView = require( './station-view' );

// Takes both a model and a collection
var StopsListView = BaseView.extend({

  el: '.container',

  template: require( './tmpl.nunj' ),

  initialize: function( opts ) {
    // Nested array defining the layout of the stops
    this.stations = this.model.stops();

    // Store the collection (of actual stop data)
    // this.collection = opts.collection;

    // Listen for new predictions data
    this.listenTo( this.collection, 'sync reset', this.render );

    // Auto-render on load
    this.render();
  },

  render: function() {
    // Render the template into the container
    this.$el.html( this.template.render( this.serialize() ) );

    var trips = this.collection;

    // Build an array of subviews (StationView or BranchView)
    var subViews = _.map( this.stations, function( station ) {
      if ( ! _.isArray( station ) ) {
        // Non-array station gets rendered as-is
        return new StationView({
          station: station,
          collection: trips
        });
      }

      // If station is an array, we're branching:
      return new BranchView({
        branches: station,
        collection: trips
      });
    });

    // Render subviews into the parent element
    this.$el.find( '.stations' ).append( _.map( subViews, function( subView ) {
      return subView.render().el;
    }));

    return this;
  }

});

module.exports = StopsListView;
