'use strict';

var _ = require( 'lodash' );
var bind = require( 'lodash.bind' );
var BaseView = require( '../../views/new-base-view' );
var branchTemplate = require( './branch.tmpl' );

var StationView = require( './station-view' );

var BranchView = BaseView.extend({

  template: bind( branchTemplate.render, branchTemplate ),

  props: {
    /**
     * Branches is an array of arrays containing stops from a specific branch
     *
     * @property {Array} branches
     */
    branches: {
      type: 'array',
      required: true
    },

    /**
     * Store the Line instance (to pass through to the view)
     *
     * @property {LineModel} line
     */
    line: {
      type: 'model',
      required: true
    },

    /**
     * Store the trip predictions collection
     *
     * @property {TripsCollection} trips
     */
    trips: {
      type: 'collection',
      required: true
    }
  },

  render: function() {
    // Iterate through each branch
    this.renderWithTemplate( this );

    var $branches = this.$( '.branch' );
    var trips = this.trips;
    var line = this.line;
    var branchView = this;

    _.forEach( this.branches, function( branch, index ) {
      // Create the subviews for this branch and return their elements
      var subviewElements = _.map( branch, function( station ) {
        var view = new StationView({
          line: line,
          station: station,
          trips: trips
        });

        // Register all views for later cleanup
        branchView.registerSubview( view );

        return view.el;
      });

      // Append the returned array of DOM nodes to the ul container for this branch
      $branches.eq( index ).find( 'ul' ).append( subviewElements );
    });

    return this;
  }

});

module.exports = BranchView;
