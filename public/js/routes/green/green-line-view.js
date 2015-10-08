'use strict';

var bind = require( 'lodash.bind' );
var View = require( 'ampersand-view' );
var greenLineTemplate = require( './green-line.tmpl' );

var GreenLineView = View.extend({

  autoRender: true,

  template: bind( greenLineTemplate.render, greenLineTemplate )

});

module.exports = GreenLineView;
