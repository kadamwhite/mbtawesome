'use strict';

var View = require( 'ampersand-view' );
var bind = require( 'lodash.bind' );
var template404 = require( '../../../../views/partials/404.tmpl' );

var IndexView = View.extend({

  autoRender: true,

  // Re-use serverside 404 template
  template: bind( template404.render, template404 )

});

module.exports = IndexView;
