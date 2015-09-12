'use strict';

var _ = {
  bind: require( 'lodash.bind' ),
  isArray: require( 'lodash.isarray' ),
  map: require( 'lodash.map' )
};
var jQueryView = require( '../../views/jq-view' );

var BranchView = require( './branch-view' );
var StationView = require( './station-view' );
var AlertsView = require( '../../views/alerts-view' );
var LineStatusView = require( '../../views/line-status-view' );
var lineOverviewTemplate = require( './line-overview.tmpl' );

var LineOverviewView = jQueryView.extend({

  autoRender: true,

  template: _.bind( lineOverviewTemplate.render, lineOverviewTemplate ),

  props: {
    // Alerts collection, to hand off to a sub-view
    alerts: 'collection',
    // LineStatus model, to hand off to a sub-view
    status: 'model',
    // List of stations on this line
    line: 'model',
    // Trip predictions, to hand off to subviews
    trips: 'collection'
  },

  derived: {
    stations: {
      deps: [ 'line' ],
      fn: function() {
        return this.line.stations;
      }
    }
  },

  subviews: {
    alertsView: {
      selector: '[data-hook=alert-list]',
      prepareView: function( el ) {
        return new AlertsView({
          alerts: this.alerts,
          el: el
        });
      }
    },
    lineStatusView: {
      selector: '[data-hook=line-status]',
      waitFor: 'status',
      prepareView: function( el ) {
        return new LineStatusView({
          status: this.status,
          el: el
        });
      }
    }
  },

  render: function() {
    // Render the template into the container
    this.renderWithTemplate();

    var trips = this.trips;
    var line = this.line;
    var view = this;

    // Build an array of subview elements (StationView or BranchView)
    var subviewElements = _.map( this.stations, function createStationOrBranchView( station ) {
      if ( ! _.isArray( station ) ) {
        // Non-array station gets rendered as-is
        view = new StationView({
          line: line,
          station: station,
          trips: trips
        });
      } else {
        // If station is an array, we're branching:
        view = new BranchView({
          line: line,
          branches: station,
          trips: trips
        });
      }
      view.registerSubview( view );
      return view.render().el;
    });

    this.$( '.stations' ).append( subviewElements );

    return this;
  }

});

module.exports = LineOverviewView;
