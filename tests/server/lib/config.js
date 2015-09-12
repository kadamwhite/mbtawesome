'use strict';

/*jshint -W106 */// Disable underscore_case warnings in this file
var chai = require( 'chai' );
var expect = chai.expect;
var proxyquire = require( 'proxyquire' );

describe( 'makeQueryHandler', function() {

  it( 'loads and parses the configuration file', function() {
    var config = proxyquire( '../../../server/services/config', {
      'js-yaml': {
        safeLoad: function() {
          return require( '../../mocks/mock-config' );
        }
      },
      fs: {
        readFileSync: function() {}
      }
    });

    // Error out if any required parameters are missing: good sanity-check
    expect( config ).to.exist;
    expect( config ).to.be.an( 'object' );
    expect( config.api ).to.exist;
    expect( config.api ).to.be.an( 'object' );
    expect( config.api.key ).to.exist;
    expect( config.api.key ).to.be.a( 'string' );
    expect( config.api.root ).to.exist;
    expect( config.api.root ).to.be.a( 'string' );
  });

  it( 'throws an error if the API key is not present in the config', function() {
    expect(function requireModule() {
      proxyquire( '../../../server/services/config', {
        'js-yaml': {
          safeLoad: function() { return { api: {} }; }
        }
      });
    }).to.throw();
  });

});
