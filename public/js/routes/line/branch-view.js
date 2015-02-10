'use strict';

var _ = require( 'lodash' );
var BaseView = require( '../../views/base-view' );

var StationView = require( './station-view' );

var BranchView = BaseView.extend({

  tagName: 'li',

  template: require( './branch.nunj' ),

  initialize: function( opts ) {
    this.branches = opts.branches;
    this.collection = opts.trips;
  },

  serialize: function() {},

  render: function() {
    // Iterate through each branch
    this.$el.html( this.template.render({
      branches: this.branches
    }));

    var $branches = this.$el.find( '.branch' );
    var trips = this.collection;

    _.forEach( this.branches, function( branch, index ) {
      // this.$el.find( 'ul' ).eq( index ).append('<li/>');
      var branchStopViews = _.map( branch, function( station ) {
        return new StationView({
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
