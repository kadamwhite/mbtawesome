'use strict';

exports.up = function( knex ) {
  // return knex.schema
  // .dropTableIfExists( 'stops' )
  // .createTableIfNotExists( 'stops', function( t ) {
  return knex.schema.createTable( 'stops', function( t ) {
    t.increments( 'id' ).primary();
    t.text( 'stop_id' ).index();
    t.text( 'stop_name' ).notNullable();
    t.integer( 'direction_id' ).notNullable();
    t.text( 'direction_name' ).notNullable();
    t.integer( 'stop_order' ).notNullable();
    t.text( 'parent_station' ).notNullable();
    t.text( 'parent_station_name' ).notNullable();
    t.float( 'stop_lat', 10, 6 );
    t.float( 'stop_lon', 10, 6 );
    t.text( 'route_id' ).notNullable();
  }).createTable( 'routes_stops', function( t ) {
    t.integer( 'route_id' ).references( 'routes.id' );
    t.integer( 'stops_id' ).references( 'stops.id' );
  });
};

exports.down = function( knex, Promise ) {
  return knex.schema
    .dropTableIfExists( 'routes_stops' )
    .dropTableIfExists( 'stops' );
};
