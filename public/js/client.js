'use strict';

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
