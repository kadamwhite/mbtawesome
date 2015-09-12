'use strict';

var _ = require( 'lodash' );
var BaseView = require( '../../views/base-view' );

var StationView = require( './station-view' );

var BranchView = BaseView.extend({

  tagName: 'li',

  template: require( './branch.tmpl' ),

  initialize: function( opts ) {
    // Branches is an array of arrays containing stops from a specific branch
    this.branches = opts.branches;
    // Store the Line instance (to pass through to the view)
    this.line = opts.line;
    // Store the trip predictions collection
    this.trips = opts.trips;

    if ( ! this.branches ) {
      throw new Error( 'BranchView initialized without branches' );
    }
    if ( ! this.trips ) {
      throw new Error( 'BranchView initialized without a TripsCollection' );
    }
  },

  render: function() {
    // Iterate through each branch
    this.$el.html( this.template.render({
      branches: this.branches
    }));

    var $branches = this.$el.find( '.branch' );
    var trips = this.trips;
    var line = this.line;

    _.forEach( this.branches, function( branch, index ) {
      var stationViewElements = _.map( branch, function( station ) {
        var view = new StationView({
          line: line,
          station: station,
          trips: trips
        });
        return view.el;
      });

      $branches.eq( index ).find( 'ul' ).append( stationViewElements );
    });

    return this;
  }

});

module.exports = BranchView;
