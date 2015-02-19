// Like an express train to sketchytown, this testing harness is... YMMV
'use strict';

// To facilitate testing with the same script environment as is
// used on the client, use proxyquire to provide Backbone with
// lodash subbed in for underscore

// noCallThru is necessary, though it feels like it should not be
var proxyquire = require( 'proxyquire' ).noCallThru();

var _ = require( '../../public/js/vendor/lodash/dist/lodash.compat' );
var Backbone = proxyquire( '../../public/js/vendor/backbone/backbone', {
  underscore: _
});

// Disable callthrough for this module, so that it in turn can be
// proxyquire'd
Backbone[ '@noCallThru' ] = true;

module.exports = Backbone;
