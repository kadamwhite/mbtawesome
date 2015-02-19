'use strict';

/*jshint -W106 */// Disable underscore_case warnings in this file
var chai = require( 'chai' );
var expect = chai.expect;
// var sinon = require( 'sinon' );
chai.use( require( 'sinon-chai' ) );
var proxyquire = require( 'proxyquire' );

proxyquire.noCallThru();
var TripModel = proxyquire( '../../../public/js/models/trip', {
  backbone: require( '../../mocks/backbone' )
});

var tripSampleData = {
  direction: 1,
  headsign: 'Alewife',
  id: '98369808',
  scheduled: false,
  stops: [{
    // Harvard
    eta: 1424371317,
    id: '70068',
    seconds: 191,
    seq: 14
  }, {
    // Porter
    eta: 1424371502,
    id: '70066',
    seconds: 376,
    seq: 15
  }, {
    // Davis
    eta: 1424371629,
    id: '70064',
    seconds: 503,
    seq: 16
  }, {
    // Alewife
    eta: 1424371790,
    id: '70061',
    seconds: 664,
    seq: 17
  }],
  vehicle: {
    bearing: 275,
    id: '1510',
    lat: 42.36316,
    lon: -71.09416,
    timestamp: 1424371060
  }
};

describe( 'TripModel', function() {
  var trip;

  beforeEach(function() {
    trip = new TripModel( tripSampleData );
  });

  describe( 'secondsToAny method', function() {

    it ( 'is defined', function() {
      expect( trip.secondsToAny ).to.exist;
      expect( trip.secondsToAny ).to.be.a( 'function' );
    });

    it ( 'finds and returns the lowest station ETA', function() {
      var eta = trip.secondsToAny( [ '70063', '70064' ] ); // Davis
      expect( eta ).to.equal( 503 );
    });

  });

});
