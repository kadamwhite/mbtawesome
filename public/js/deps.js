/* global Backbone:false */
/* global jQuery:false */
/* global _:false */
'use strict';

// We do not currently bundle the third-party scripts together with
// our first-party code: they are loaded with their own script tags.
// This dependencies file abstracts that out so that we can require
// these modules within different areas of the application in a
// readable fashion.
module.exports = {
  _: _,
  Backbone: Backbone,
  jQuery: jQuery
};
