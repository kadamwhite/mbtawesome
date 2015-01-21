'use strict';

var config = require( '../services/configuration' );
var knexConfig = require( '../knexfile' );

console.log( 'Connecting to development PostgreSQL database...' );

// Get the name of the environment for which we should initialize knex
var environment = config.db.mode;

var knex = require( 'knex' )( knexConfig[ environment ] );
var bookshelf = require( 'bookshelf' )( knex );

module.exports = bookshelf;
