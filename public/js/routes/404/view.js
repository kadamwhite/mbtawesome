'use strict';

var View = require( 'ampersand-view' );
var _ = require( 'lodash' );
var template404 = require( '../../../../views/partials/404.tmpl' );

var IndexView = View.extend({

  autoRender: true,

  // Re-use serverside 404 template
  template: _.bind( template404.render, template404 )

});

module.exports = IndexView;
