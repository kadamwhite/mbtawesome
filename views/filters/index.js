'use strict';

// Permit the application to inject the Express Nunjucks environment
function setEnvironment( env ) {
  // Bind to `env` wherever we need to access built-in filters
  env.addFilter( 'serialize', require( './serialize' ).bind( env ) );
  env.addFilter( 'get', require( './get' ).bind( env ) );
}

module.exports = {
  setEnvironment: setEnvironment
};
