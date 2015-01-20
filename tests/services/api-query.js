'use strict';

/*jshint -W106 */// Disable underscore_case warnings in this file
var chai = require( 'chai' );
var expect = chai.expect;
var sinon = require( 'sinon' );
chai.use( require( 'sinon-chai' ) );
chai.use( require( 'chai-as-promised' ) );
var proxyquire = require( 'proxyquire' );

var mockConfig = require( '../mocks/mock-config' );
// var url = require( 'url' );

describe( 'api-query module', function() {

  var mockRestler;
  var query;
  var basicOn;

  beforeEach(function() {
    basicOn = function() {
      return { on: basicOn };
    };

    mockRestler = {
      get: sinon.stub()
    };

    query = proxyquire( '../../services/api-query', {
      'restler': mockRestler,
      './configuration': mockConfig
    });
  });

  describe( 'makeQueryHandler', function() {

    var data = {};

    // Factory method to make it easier to fire events
    function fireCbOn( targetEvent ) {
      return function( evt, cb ) {
        if ( evt === targetEvent ) {
          cb( data );
        }
      };
    }

    beforeEach(function() {
      // Default stub behavior: always succeed
      mockRestler.get.returns({ on: fireCbOn( 'success' ) });
    });

    it( 'returns a function', function() {
      var fn = query._makeQueryHandler( 'endpoint', [] );

      expect( fn ).to.be.a( 'function' );
    });

    it( 'returns a function that throws if insufficient arguments are provided', function() {
      var fn = query._makeQueryHandler( 'endpoint', [ 'param1', 'param2' ] );

      return expect( fn( 'val1' ) ).to.eventually.be
        .rejectedWith( '2 parameters required, but only 1 supplied' );
    });

    it( 'returns a function that maps provided values to required parameters', function() {
      var fn = query._makeQueryHandler( 'endpoint', [ 'p1', 'p2', 'p3' ] );
      var prom = fn( 'v1', 'v2', 'v3' ).then(function( result ) {
        return expect( mockRestler.get ).to.have.been
          .calledWith( 'apiroot/v2/endpoint?p1=v1&p2=v2&p3=v3&api_key=apikey&format=json' );
      });
      return expect( prom ).to.be.fulfilled;
    });

    it( 'returns a function that can parse an object hash of query parameters', function() {
      var fn = query._makeQueryHandler( 'endpoint', [ 'p1', 'p2', 'p3' ] );
      var prom = fn({
        p1: 'v1',
        p2: 'v2',
        p3: 'v3'
      }).then(function( result ) {
        return expect( mockRestler.get ).to.have.been
          .calledWith( 'apiroot/v2/endpoint?p1=v1&p2=v2&p3=v3&api_key=apikey&format=json' );
      });
      return expect( prom ).to.be.fulfilled;
    });

  });

  describe( 'endpoint query methods', function() {

    beforeEach(function() {
      mockRestler.get.returns({ on: basicOn });
    });

    it ( 'routes method creates a request against the routes endpoint', function() {
      query.routes();
      expect( mockRestler.get ).to.have.been
        .calledWith( 'apiroot/v2/routes?api_key=apikey&format=json' );
    });

  });

});
