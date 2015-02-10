'use strict';

var BaseView = require( '../../views/base-view' );

var StationView = BaseView.extend({

  tagName: 'li',

  className: 'station',

  template: require( './station.nunj' ),

  initialize: function( opts ) {
    this.station = opts.station;

    // Probably not needed?
    // this.listenTo( this.collection, 'add sync reset', this.render );
  },

  serialize: function() {
    return {
      station: this.station
    };
  }

});

module.exports = StationView;
