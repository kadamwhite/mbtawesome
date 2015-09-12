'use strict';

/*jshint -W106 */// Disable underscore_case warnings in this file
var chai = require( 'chai' );
var expect = chai.expect;

var _ = require( 'lodash' );

var Model = require( 'ampersand-model' );
var LineStatusModel = require( '../../../public/js/models/line-status' );
var AlertsCollection = require( '../../../public/js/collections/alerts' );
var TripsCollection = require( '../../../public/js/collections/trips' );

// THE TESTS
// ==============================================

describe( 'LineStatusModel', function() {
  var lineStatus;
  var testStations;
  var testTrips;

  beforeEach(function() {
    // Flat array of station objects
    testStations = [{
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
    testTrips = [{
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

    // Create the lineStatus instance to test
    lineStatus = new LineStatusModel({
      alerts: new AlertsCollection(),
      predictions: new TripsCollection( testTrips, {
        line: {}
      }),
      stations: testStations
    });
  });

  it( 'should extend Ampersand Model', function() {
    expect( lineStatus ).to.be.an.instanceof( Model );
  });

  describe( 'properties', function() {
    it( '"alerts" should be a collection', function() {
      expect( lineStatus ).to.have.property( 'alerts' );
      expect( lineStatus.alerts ).to.be.an.instanceof( AlertsCollection );
      expect( lineStatus.alerts.length ).to.equal( 0 );
      expect(function() { lineStatus.alerts = 4; }).to.throw; // Strict typing
    });
    it( '"predictions" should be a collection', function() {
      expect( lineStatus ).to.have.property( 'predictions' );
      expect( lineStatus.predictions ).to.be.an.instanceof( TripsCollection );
      expect( lineStatus.predictions.length ).to.equal( 3 );
      expect(function() { lineStatus.predictions = 'Gottlieb'; }).to.throw; // Strict typing
    });
    it( '"stations" should be an array', function() {
      expect( lineStatus ).to.have.property( 'stations' );
      expect( lineStatus.stations ).to.be.an( 'array' );
      expect( _.pluck( lineStatus.stations, 'name' ) ).to.deep.equal([
        'Oak Grove', 'Malden Center', 'Wellington'
      ]);
      expect(function() { lineStatus.stations = 'Bally'; }).to.throw; // Strict typing
    });
  });

  describe( 'derived properties', function() {

    describe( '"trainsInService"', function() {

      it( 'should be an object', function() {
        expect( lineStatus ).to.have.property( 'trainsInService' );
        expect( lineStatus.trainsInService ).to.be.an( 'object' );
      });

      it( 'should be keyed by GTFS destination IDs (1/0)', function() {
        expect( _.keys( lineStatus.trainsInService ) ).to.deep.equal([ '0', '1' ]);
      });

      it( 'should hold the number of trains in servie for each headsign', function() {
        expect( lineStatus.trainsInService ).to.deep.equal({
          '0': [{
            headsign: 'Forest Hills',
            count: 1
          }],
          '1': [{
            headsign: 'Oak Grove',
            count: 2
          }]
        });
      });

      it( 'is recomputed when predictions change', function() {
        lineStatus.predictions.reset([ testTrips[ 1 ] ]);
        expect( lineStatus.trainsInService ).to.deep.equal({
          '1': [{
            headsign: 'Oak Grove',
            count: 1
          }]
        });
      });

    });

    describe( '"totalTrainsInService"', function() {

      it( 'should be a number', function() {
        expect( lineStatus ).to.have.property( 'totalTrainsInService' );
        expect( lineStatus.totalTrainsInService ).to.be.a( 'number' );
      });

      it( 'should reflect the number of trains present', function() {
        expect( lineStatus.totalTrainsInService ).to.equal( 3 );
      });

      it( 'should update when predictions change', function() {
        lineStatus.predictions.reset([ testTrips[ 0 ], testTrips[ 2 ] ]);
        expect( lineStatus.totalTrainsInService ).to.equal( 2 );
        lineStatus.predictions.reset();
        expect( lineStatus.totalTrainsInService ).to.equal( 0 );
      });

    });

    describe( '"noTrainsInService"', function() {

      it( 'should be a boolean', function() {
        expect( lineStatus ).to.have.property( 'noTrainsInService' );
        expect( lineStatus.noTrainsInService ).to.be.a( 'boolean' );
      });

      it( 'should reflect whether any train predictions are present', function() {
        expect( lineStatus.noTrainsInService ).to.be.false;
      });

      it( 'should update when predictions change', function() {
        lineStatus.predictions.reset();
        expect( lineStatus.noTrainsInService ).to.be.true;
      });

    });

    describe( '"stationDictionary"', function() {

      it( 'should be an object', function() {
        expect( lineStatus ).to.have.property( 'stationDictionary' );
        expect( lineStatus.stationDictionary ).to.be.an( 'object' );
      });

      it( 'is a dictionary of direction objects, keyed by direction_id', function() {
        expect( _.keys( lineStatus.stationDictionary ) ).to.deep.equal([ '0', '1' ]);
      });

      it( 'gives each direction object a name property', function() {
        expect( lineStatus.stationDictionary[ '0' ].name ).to.equal( 'Southbound' );
        expect( lineStatus.stationDictionary[ '1' ].name ).to.equal( 'Northbound' );
      });

      it( 'gives each direction object a stops dictionary, keyed by stop_id', function() {
        expect( lineStatus.stationDictionary[ '0' ].stops ).to.deep.equal({
          '70032': [], '70034': [], '70036': []
        });
        expect( lineStatus.stationDictionary[ '1' ].stops ).to.deep.equal({
          '70033': [], '70035': [], '70036': []
        });
      });

      it( 'sets each stop\'s dictionary member to an empty array', function() {
        [ '0', '1' ].forEach(function( key ) {
          _.forEach( lineStatus.stationDictionary[ key ].stops, function( stop ) {
            expect( _.isArray( stop ) ).to.be.ok;
            expect( stop.length ).to.equal( 0 );
          });
        });
      });

      it( 'should update when stations change', function() {
        lineStatus.set({
          // Add a station
          stations: testStations.concat({
            stops: [
              { dir: 0, dirName: 'Southbound', id: '70030' },
              { dir: 1, dirName: 'Northbound', id: '70031' }
            ]
          })
        });
        // Validate station was added to dictionary
        [ '70030', '70032', '70034', '70036' ].forEach(function( stationId ) {
          expect( lineStatus.stationDictionary[ '0' ].stops ).to.have.property( stationId );
          expect( lineStatus.stationDictionary[ '0' ].stops[ stationId] ).to.be.an( 'array' );
        });
        [ '70031', '70033', '70035', '70036' ].forEach(function( stationId ) {
          expect( lineStatus.stationDictionary[ '1' ].stops ).to.have.property( stationId );
          expect( lineStatus.stationDictionary[ '1' ].stops[ stationId] ).to.be.an( 'array' );
        });
      });

    });

    describe( '"averageWaitTimes"', function() {

      it( 'should be an object', function() {
        expect( lineStatus ).to.have.property( 'averageWaitTimes' );
        expect( lineStatus.averageWaitTimes ).to.be.an( 'object' );
      });

      it( 'contains a dictionary of wait time objects', function() {
        expect( lineStatus.averageWaitTimes ).to.deep.equal({
          '0': {
            name: 'Southbound',
            wait: 4
          },
          '1': {
            name: 'Northbound',
            wait: 12
          }
        });
      });

      it( 'is recomputed when predictions change', function() {
        expect( lineStatus.averageWaitTimes[ '0' ].wait ).to.equal( 4 );
        lineStatus.predictions.reset([ testTrips[ 0 ], testTrips[ 2 ] ]);
        expect( lineStatus.averageWaitTimes[ '1' ].wait ).to.equal( 12 );
      });

    });

    describe( '"loading"', function() {

      it( 'should be a boolean', function() {
        expect( lineStatus ).to.have.property( 'loading' );
        expect( lineStatus.loading ).to.be.a( 'boolean' );
      });

      it( 'reflects whether the predictions have loaded', function() {
        expect( lineStatus.predictions.loaded ).to.be.false;
        expect( lineStatus.loading ).to.be.true;
      });

      it( 'is recomputed when change:predictions fires', function() {
        expect( lineStatus.loading ).to.be.true;
        lineStatus.predictions.loaded = true;
        lineStatus._triggerPredictionsChange();
        expect( lineStatus.loading ).to.be.false;
      });

    });

  });

});
