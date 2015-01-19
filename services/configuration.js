'use strict';

var path = require( 'path' );
var yaml = require( 'js-yaml' );
var fs = require( 'fs' );

var configuration;

var configPath = path.resolve( __dirname, '../config.yml' );

// Get document, or throw exception on error
configuration = yaml.safeLoad( fs.readFileSync( configPath, 'utf8' ) );

if ( ! configuration.api.key ) {
  throw new Error( 'API key missing from configuration file' );
}

module.exports = configuration;
