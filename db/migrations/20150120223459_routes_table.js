'use strict';

exports.up = function( knex ) {
  return knex.schema.createTable( 'routes', function( t ) {
    t.increments( 'id' ).primary();
    t.text( 'route_id' ).index();
    t.text( 'route_name' ).notNullable();
    t.integer( 'route_type' ).notNullable();
    t.text( 'mode_name' ).notNullable();
    t.boolean( 'route_hide' ).notNullable().defaultTo( false );
  });
};

exports.down = function( knex, Promise ) {
  return knex.schema.dropTableIfExists( 'routes' );
};
