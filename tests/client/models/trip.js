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

  describe( 'secondsToStop method', function() {

    it ( 'is defined', function() {
      expect( trip.secondsToStop ).to.exist;
      expect( trip.secondsToStop ).to.be.a( 'function' );
    });

    it ( 'returns the number of seconds until the provided stop', function() {
      var eta = trip.secondsToStop( '70066' ); // Porter
      expect( eta ).to.equal( 376 );
    });

    it ( 'returns -1 if this trip does not visit the provided stop', function() {
      var eta = trip.secondsToStop( '70078' ); // DTX
      expect( eta ).to.equal( -1 );
    });

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

    it ( 'returns undefined if trip does not visit provided stops', function() {
      var eta = trip.secondsToAny( [ '70101', '70102' ] ); // Quincy Center
      expect( eta ).to.be.undefined;
    });

  });

  describe( 'active method', function() {

    it ( 'is defined', function() {
      expect( trip.active ).to.exist;
      expect( trip.active ).to.be.a( 'function' );
    });

    it ( 'returns true if the trip has a vehicle', function() {
      var isActive = trip.active();
      expect( isActive ).to.equal( true );
    });

    it ( 'returns false if the trip does not have a vehicle', function() {
      trip.unset( 'vehicle' );
      var isActive = trip.active();
      expect( isActive ).to.equal( false );
    });

  });

});
