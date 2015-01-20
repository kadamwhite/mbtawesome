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
      get: sinon.stub().returns({ on: basicOn })
    };

    query = proxyquire( '../../services/api-query', {
      // Mock out the deps for the module api-query uses to create endpoint handlers
      './make-query-handler': proxyquire( '../../services/make-query-handler', {
        'restler': mockRestler,
        './configuration': mockConfig
      })
    });
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

  describe( 'scheduleByStop()', function() {

    it ( 'creates a request against the schedulebystop endpoint', function() {
      query.scheduleByStop( 'stopID' );
      expect( mockRestler.get ).to.have.been
        .calledWith( 'apiroot/v2/schedulebystop?stop=stopID&api_key=apikey&format=json' );
    });

    it ( 'requires the "stop" parameter to be specified', function() {
      return expect( query.scheduleByStop() ).to.be
        .rejectedWith( 'missing required parameter: stop' );
    });

  });

  describe( 'scheduleByRoute()', function() {

    it ( 'creates a request against the schedulebyroute endpoint', function() {
      query.scheduleByRoute( 'routeID' );
      expect( mockRestler.get ).to.have.been
        .calledWith( 'apiroot/v2/schedulebyroute?route=routeID&api_key=apikey&format=json' );
    });

    it ( 'requires the "route" parameter to be specified', function() {
      return expect( query.scheduleByRoute() ).to.be
        .rejectedWith( 'missing required parameter: route' );
    });

  });

});
