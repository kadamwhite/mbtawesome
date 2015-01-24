/* global Backbone:false */
'use strict';

// We do not currently bundle the third-party scripts together with
// our first-party code: they are loaded with their own script tags.
// This module provides a shim to let modules within our application
// require Backbone: "backbone" maps here in the package.json file's
// "browser" browserify mapping definitions.
module.exports = Backbone;
