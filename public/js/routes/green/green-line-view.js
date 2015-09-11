'use strict';

var bind = require( 'lodash.bind' );
var View = require( 'ampersand-view' );
var AlertsView = require( '../../views/alerts-view' );
var greenLineTemplate = require( './green-line.tmpl' );

var GreenLineView = View.extend({

  autoRender: true,

  props: {
    /**
     * AlertsCollection containing the alerts for the green line
     *
     * @property {AlertsCollection} alerts
     */
    alerts: 'collection'
  },

  subviews: {
    alertsView: {
      selector: '[data-hook=alerts-list]',
      prepareView: function( el ) {
        return new AlertsView({
          alerts: this.alerts,
          el: el
        });
      }
    }
  },

  template: bind( greenLineTemplate.render, greenLineTemplate )

});

module.exports = GreenLineView;
