'use strict';

/*jshint -W106 */// Disable underscore_case warnings in this file
var chai = require( 'chai' );
var expect = chai.expect;
// var sinon = require( 'sinon' );
chai.use( require( 'sinon-chai' ) );
var proxyquire = require( 'proxyquire' );
var _ = require( 'lodash' );

var Backbone = require( '../../mocks/backbone' );
var LineStatusModel = proxyquire( '../../../public/js/models/line-status', {
  backbone: Backbone
});

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

describe( 'TripModel', function() {
  var lineStatus;

  beforeEach(function() {
    lineStatus = new LineStatusModel({
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

});
