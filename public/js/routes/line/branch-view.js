'use strict';

var _ = require( 'lodash' );
var BaseView = require( '../../views/base-view' );

var StationView = require( './station-view' );

var BranchView = BaseView.extend({

  tagName: 'li',

  template: require( './branch.nunj' ),

  initialize: function( opts ) {
    this.branches = opts.branches;
    // Store the line slug (to pass through to the view)
    this.line = opts.line;

    if ( ! this.branches ) {
      throw new Error( 'BranchView initialized without branches' );
    }
    if ( ! this.collection ) {
      throw new Error( 'BranchView initialized without a collection' );
    }
  },

  render: function() {
    // Iterate through each branch
    this.$el.html( this.template.render({
      branches: this.branches
    }));

    var $branches = this.$el.find( '.branch' );
    var trips = this.collection;
    var line = this.line;

    _.forEach( this.branches, function( branch, index ) {
      var branchStopViews = _.map( branch, function( station ) {
        return new StationView({
          line: line,
          station: station,
          collection: trips
        });
      });

      var $stationList = $branches.eq( index ).find( 'ul' );

      $stationList.append( _.map( branchStopViews, function( view ) {
        return view.render().el;
      }));
    });

    return this;
  }

});

module.exports = BranchView;
