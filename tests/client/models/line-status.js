'use strict';

/*jshint -W106 */// Disable underscore_case warnings in this file
var chai = require( 'chai' );
var expect = chai.expect;
// var sinon = require( 'sinon' );
chai.use( require( 'sinon-chai' ) );
// var proxyquire = require( 'proxyquire' );
var _ = require( 'lodash' );

var Backbone = require( 'backbone' );
var LineStatusModel = require( '../../../public/js/models/line-status' );
var TripsCollection = require( '../../../public/js/collections/trips' );

// Flat array of station objects
var testStations = [{
  name: 'Oak Grove',
  station: 'place-ogmnl',
  stops: [
    { dir: 0, dirName: 'Southbound', id: '70036' },
    { dir: 1, dirName: 'Northbound', id: '70036' }
  ]
}, {
  name: 'Malden Center',
  station: 'place-mlmnl',
  transfer: [ 'rail' ],
  stops: [
    { dir: 0, dirName: 'Southbound', id: '70034' },
    { dir: 1, dirName: 'Northbound', id: '70035' }
  ]
}, {
  name: 'Wellington',
  station: 'place-welln',
  stops: [
    { dir: 0, dirName: 'Southbound', id: '70032' },
    { dir: 1, dirName: 'Northbound', id: '70033' }
  ]
}];

// Northbound average wait: ceil( 701s / 60 ) = 12min
// Southbound average wait: ceil( 235s / 60 ) = 4min
var testTrips = [{
  id: '25730054',
  headsign: 'Oak Grove',
  direction: 1,
  vehicle: {},
  stops: [
    { id: '70035', seconds: 179 },
    { id: '70036', seconds: 364 }
  ]
}, {
  id: '25729993',
  headsign: 'Oak Grove',
  direction: 1,
  vehicle: {},
  stops: [
    // average wait 879
    { id: '70033', seconds: 879 },
    // average wait 566
    { id: '70035', seconds: 1132 },
    // average wait 657
    { id: '70036', seconds: 1317 }
  ]
}, {
  id: '25730165',
  headsign: 'Forest Hills',
  direction: 0,
  vehicle: {},
  stops: [
    // average wait 155
    { id: '70034', seconds: 155 },
    // average wait 314
    { id: '70032', seconds: 314 }
  ]
}];

// THE TESTS
// ==============================================

describe( 'LineStatusModel', function() {
  var lineStatus;

  beforeEach(function() {
    lineStatus = new LineStatusModel({
      predictions: new TripsCollection( testTrips, {
        line: {}
      }),
      stations: testStations
    });
  });

  it( 'should extend Backbone.Model', function() {
    expect( lineStatus ).to.be.an.instanceof( Backbone.Model );
  });

  describe( 'buildStationDictionary method', function() {

    it( 'exists', function() {
      expect( lineStatus.buildStationDictionary ).to.exist;
      expect( lineStatus.buildStationDictionary ).to.be.a( 'function' );
    });

    it( 'builds a dictionary of direction objects, keyed by direction_id', function() {
      var dictionary = lineStatus.buildStationDictionary();
      expect( _.keys( dictionary ).sort().join( '|' ) ).to.equal( '0|1' );
    });

    it( 'gives each direction object a name property', function() {
      var dictionary = lineStatus.buildStationDictionary();
      expect( dictionary[ '0' ].name ).to.equal( 'Southbound' );
      expect( dictionary[ '1' ].name ).to.equal( 'Northbound' );
    });

    it( 'gives each direction object a stops dictionary, keyed by stop_id', function() {
      var dictionary = lineStatus.buildStationDictionary();
      var stops;

      stops = dictionary[ '0' ].stops;
      expect( stops ).to.be.an( 'object' );
      expect( _.keys( stops ).sort().join( '|' ) ).to.equal( '70032|70034|70036' );

      stops = dictionary[ '1' ].stops;
      expect( stops ).to.be.an( 'object' );
      expect( _.keys( stops ).sort().join( '|' ) ).to.equal( '70033|70035|70036' );
    });

    it( 'sets each stops dictionary member to an empty array', function() {
      var dictionary = lineStatus.buildStationDictionary();

      [ '0', '1' ].forEach(function( key ) {
        var directionObj = dictionary[ key ];
        _.forEach( directionObj.stops, function( stop ) {
          expect( _.isArray( stop ) ).to.be.ok;
          expect( stop.length ).to.equal( 0 );
        });
      });
    });

  });

  describe( 'updateAverageWaitTimes method', function() {

    it( 'exists', function() {
      expect( lineStatus.updateAverageWaitTimes ).to.exist;
      expect( lineStatus.updateAverageWaitTimes ).to.be.a( 'function' );
    });

    it( 'sets the averageWaitTimes property on the model', function() {
      // set during initialization: remove to test that it is set in this method
      lineStatus.unset( 'averageWaitTimes' );
      expect( lineStatus.get( 'averageWaitTimes' ) ).to.be.undefined;
      lineStatus.updateAverageWaitTimes();
      expect( lineStatus.get( 'averageWaitTimes' ) ).to.exist;
      expect( lineStatus.get( 'averageWaitTimes' ) ).to.be.an( 'object' );
    });

    it( 'produces a dictionary of wait time objects', function() {
      var waitTimes = lineStatus.updateAverageWaitTimes();
      expect( waitTimes[ '0' ] ).to.exist;
      expect( waitTimes[ '0' ] ).to.be.an( 'object' );
      expect( waitTimes[ '0' ].name ).to.equal( 'Southbound' );
      expect( waitTimes[ '0' ].wait ).to.equal( 4 );
      expect( waitTimes[ '1' ] ).to.exist;
      expect( waitTimes[ '1' ] ).to.be.an( 'object' );
      expect( waitTimes[ '1' ].name ).to.equal( 'Northbound' );
      expect( waitTimes[ '1' ].wait ).to.equal( 12 );
    });

  });

});
