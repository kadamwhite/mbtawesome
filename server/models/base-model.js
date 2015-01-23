'use strict';

var DB = require( '../db' );

// Methods to be added to the model
var instanceProperties = {};
var classProperties = {};

/**
 * Easily access the underlying knex object from any model
 *
 * @method db
 * @static
 * @return knex instance
 */
classProperties.db = function db() {
  return DB.knex;
};

/**
 * Access a single record by ID. The promise will reject with a
 * Model.NotFoundError error if the id is not found in the DB.
 *
 * @method byId
 * @static
 * @param {Number} id     The ID to search for in the database
 * @param {Object} [opts] Query options
 * @return {Promise} A promise to the results of the query
 */
classProperties.byId = function byId( id, opts ) {
  return this.forge({
    id: id
  }).fetch( opts || { require: true });
};

/**
 * Easily create a new record in the database by passing a properties object.
 *
 * @method create
 * @static
 * @param {Object} props An object of properties to save in the database
 * @return {Promise} A promise to the result of the save call
 */
classProperties.create = function create( props ) {
  return this.forge( props ).save();
};

/**
 * Attempt to find a record in the database matching the provided properties.
 * If no matching object is found, a new record will be created with the
 * provided information.
 *
 * @static
 * @method findOrCreate
 * @param {Object} props        Values to use when finding or creating the model
 * @param {Object} [findParams] Optional parameters for the fetch query
 * @return {Promise} A promise to the model, regardless of whether it was found
 *                   or newly-created.
 */
classProperties.findOrCreate = function findOrCreate( props, findParams ) {
  var self = this;
  findParams = findParams || props;
  var find = this.forge( findParams ).fetch();
  return find.then(function( result ) {
    if ( result ) {
      return find;
    }
    // Not found: create the record, then retrieve and return the newly-created
    // record from the database as a model instance.
    return self.forge( props ).save().then(function( model ) {
      return self.byId( model.id );
    });
  });
};

// "class properties" are attached directly to the BaseModel constructor
// as static methods; instance properties are bound to individual instances.
var BaseModel = DB.Model.extend( instanceProperties, classProperties );

module.exports = BaseModel;
