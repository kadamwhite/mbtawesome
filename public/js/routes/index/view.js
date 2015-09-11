'use strict';

var bind = require( 'lodash.bind' );
var View = require( 'ampersand-view' );
var indexTemplate = require( './index.tmpl' );

var IndexView = View.extend({

  autoRender: true,

  template: bind( indexTemplate.render, indexTemplate )

});

module.exports = IndexView;
