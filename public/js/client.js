'use strict';

// Configure template renderer
// See "browser" section of package.json: 'nunjucks' is mapped to 'nunjucks-slim'.
// We have to create a Nunjucks environment and save it as nunjucks.env in order
// for the filters in the precompiled templates to be parsed correctly.
var nunjucks = require( 'nunjucks' );
nunjucks.env = new nunjucks.Environment();
require( '../../views/filters' ).setEnvironment( nunjucks.env );

// Namespace
// ==============================================
var MBTApp = {};

// Navigation
// ==============================================
MBTApp.router = require( './router' );

MBTApp.router.start({
  // Autoprefixer only acts on #-prefixed links: turning it off avoids
  // auto-binding an unneeded event handler
  autoprefix: false,
  html5: true
});

// WindowView intercepts all local navigation clicks and converts them to
// router navigation actions
require( './views/window-view' );

module.exports = MBTApp;
