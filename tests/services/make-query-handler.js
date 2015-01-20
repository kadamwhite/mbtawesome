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

describe( 'makeQueryHandler', function() {

  var mockRestler;
  var makeQueryHandler;
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
    mockRestler = {
      // Default stub behavior: always succeed
      get: sinon.stub().returns({ on: fireCbOn( 'success' ) })
    };

    makeQueryHandler = proxyquire( '../../services/make-query-handler', {
      'restler': mockRestler,
      './configuration': mockConfig
    });
  });

  it( 'returns a function', function() {
    var fn = makeQueryHandler( 'endpoint', [] );

    expect( fn ).to.be.a( 'function' );
  });

  it( 'returns a function that throws if insufficient arguments are provided', function() {
    var fn = makeQueryHandler( 'endpoint', [ 'p1', 'p2' ] );

    return expect( fn( 'v1' ) ).to.be.rejectedWith( 'missing required parameter: p2' );
  });

  it( 'returns a function that throws if insufficient options are provided', function() {
    var fn = makeQueryHandler( 'endpoint', [ 'p1', 'p2' ] );

    return expect( fn({
      p2: 'v2'
    }) ).to.be.rejectedWith( 'missing required parameter: p1' );
  });

  it( 'returns a function that throws if any required parameters are omitted', function() {
    var fn = makeQueryHandler( 'endpoint', [ 'p1', 'p2', 'p3' ] );

    return expect( fn( 'v1', {
      p3: 'v3'
    }) ).to.be.rejectedWith( 'missing required parameter: p2' );
  });

  it( 'returns a function that maps provided values to required parameters', function() {
    var fn = makeQueryHandler( 'endpoint', [ 'p1', 'p2', 'p3' ] );
    var prom = fn( 'v1', 'v2', 'v3' ).then(function( result ) {
      return expect( mockRestler.get ).to.have.been
        .calledWith( 'apiroot/v2/endpoint?p1=v1&p2=v2&p3=v3&api_key=apikey&format=json' );
    });
    return expect( prom ).to.be.fulfilled;
  });

  it( 'returns a function that can parse an object hash of query parameters', function() {
    var fn = makeQueryHandler( 'endpoint', [ 'p1', 'p2', 'p3' ] );
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

  it( 'returns a function that can parse explicit arguments and a params obj', function() {
    var fn = makeQueryHandler( 'endpoint', [ 'p1', 'p2', 'p3' ] );
    var prom = fn( 'v1', 'v2', {
      p3: 'v3'
    }).then(function( result ) {
      return expect( mockRestler.get ).to.have.been
        .calledWith( 'apiroot/v2/endpoint?p1=v1&p2=v2&p3=v3&api_key=apikey&format=json' );
    });
    return expect( prom ).to.be.fulfilled;
  });

});
