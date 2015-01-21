'use strict';

exports.up = function( knex ) {
  return knex.schema.createTable( 'routes', function( t ) {
    t.text( 'route_id' ).primary();
    // TODO: The max current route name is 28 characters: is it worth making
    // this e.g. a string column of length 50, or is that over-optimization?
    t.text( 'route_name' ).notNullable();
    t.integer( 'route_type' ).notNullable();
    t.text( 'mode_name' ).notNullable();
    t.boolean( 'route_hide' ).notNullable().defaultTo( false );
  });
};

exports.down = function( knex, Promise ) {
  return knex.schema.dropTableIfExists( 'routes' );
};
