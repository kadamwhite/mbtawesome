'use strict';

var knexConfig = require( '../knexfile' );
console.log( 'Connecting to development PostgreSQL database...' );
var knex = require( 'knex' )( knexConfig );

var bookshelf = require( 'bookshelf' )( knex );

module.exports = bookshelf;
