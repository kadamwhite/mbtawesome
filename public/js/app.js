// We do not currently bundle the third-party scripts together with
// our first-party code: they are loaded with their own script tags
/* global Backbone:false */
/* global jQuery:false */
/* global _:false */
'use strict';

var $ = jQuery;

console.log( typeof $, typeof Backbone, typeof _ );
