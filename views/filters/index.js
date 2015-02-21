'use strict';

// Permit the application to inject the Express Nunjucks environment
function setEnvironment( env ) {
  // Bind to `env` wherever we need to access built-in filters
  env.addFilter( 'get', require( './get' ).bind( env ) );
  env.addFilter( 'pluralize', require( './pluralize' ).bind( env ) );
  env.addFilter( 'serialize', require( './serialize' ).bind( env ) );
  env.addFilter( 'supportedLine', require( './supported-line' ).bind( env ) );
}

module.exports = {
  setEnvironment: setEnvironment
};
