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
      var fn = query._makeQueryHandler( 'endpoint', [ 'p1', 'p2' ] );

      return expect( fn( 'v1' ) ).to.be.rejectedWith( 'missing required parameter: p2' );
    });

    it( 'returns a function that throws if insufficient options are provided', function() {
      var fn = query._makeQueryHandler( 'endpoint', [ 'p1', 'p2' ] );

      return expect( fn({
        p2: 'v2'
      }) ).to.be.rejectedWith( 'missing required parameter: p1' );
    });

    it( 'returns a function that throws if any required parameters are omitted', function() {
      var fn = query._makeQueryHandler( 'endpoint', [ 'p1', 'p2', 'p3' ] );

      return expect( fn( 'v1', {
        p3: 'v3'
      }) ).to.be.rejectedWith( 'missing required parameter: p2' );
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

    it( 'returns a function that can parse explicit arguments and a params obj', function() {
      var fn = query._makeQueryHandler( 'endpoint', [ 'p1', 'p2', 'p3' ] );
      var prom = fn( 'v1', 'v2', {
        p3: 'v3'
      }).then(function( result ) {
        return expect( mockRestler.get ).to.have.been
          .calledWith( 'apiroot/v2/endpoint?p1=v1&p2=v2&p3=v3&api_key=apikey&format=json' );
      });
      return expect( prom ).to.be.fulfilled;
    });

  });

  describe( 'endpoint method', function() {

    beforeEach(function() {
      mockRestler.get.returns({ on: basicOn });
    });

    describe( 'routes()', function() {

      it ( 'creates a request against the routes endpoint', function() {
        query.routes();
        expect( mockRestler.get ).to.have.been
          .calledWith( 'apiroot/v2/routes?api_key=apikey&format=json' );
      });

    });

    describe( 'routesByStop()', function() {

      it ( 'creates a request against the routesbystop endpoint', function() {
        query.routesByStop( 'stopID' );
        expect( mockRestler.get ).to.have.been
          .calledWith( 'apiroot/v2/routesbystop?stop=stopID&api_key=apikey&format=json' );
      });

      it ( 'requires the "stop" parameter to be specified', function() {
        return expect( query.routesByStop() ).to.be
          .rejectedWith( 'missing required parameter: stop' );
      });

    });

    describe( 'stopsByRoute()', function() {

      it ( 'creates a request against the stopsbyroute endpoint', function() {
        query.stopsByRoute( 'routeID' );
        expect( mockRestler.get ).to.have.been
          .calledWith( 'apiroot/v2/stopsbyroute?route=routeID&api_key=apikey&format=json' );
      });

      it ( 'requires the "route" parameter to be specified', function() {
        return expect( query.stopsByRoute() ).to.be
          .rejectedWith( 'missing required parameter: route' );
      });

    });

    describe( 'stopsByLocation()', function() {

      it ( 'creates a request against the stopsbylocation endpoint', function() {
        query.stopsByLocation( 42, -71 );
        expect( mockRestler.get ).to.have.been
          .calledWith( 'apiroot/v2/stopsbylocation?lat=42&lon=-71&api_key=apikey&format=json' );
      });

      it ( 'requires the "lat" parameter to be specified', function() {
        return expect( query.stopsByLocation() ).to.be
          .rejectedWith( 'missing required parameter: lat' );
      });

      it ( 'requires the "lon" parameter to be specified', function() {
        return expect( query.stopsByLocation( 42.352913 ) ).to.be
          .rejectedWith( 'missing required parameter: lon' );
      });

    });

  });

});
