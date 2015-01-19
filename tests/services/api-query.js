'use strict';

/*jshint -W106 */// Disable underscore_case warnings in this file
var chai = require( 'chai' );
var expect = chai.expect;
var sinon = require( 'sinon' );
chai.use( require( 'sinon-chai' ) );
var proxyquire = require( 'proxyquire' );

var mockConfig = require( '../mocks/mock-config' );

describe( 'endpoint query methods', function() {

  var mockRestler;
  var query;

  beforeEach(function() {
    function on() {
      return { on: on };
    }

    mockRestler = {
      get: sinon.stub().returns({ on: on })
    };

    query = proxyquire( '../../services/api-query', {
      'restler': mockRestler,
      './configuration': mockConfig
    });
  });

  it ( 'routes method creates a request against the routes endpoint', function() {
    query.routes();
    expect( mockRestler.get ).to.have.been
      .calledWith( 'apiroot/v2/routes?api_key=apikey&format=json' );
  });

});
