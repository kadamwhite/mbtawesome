'use strict';

/*jshint -W106 */// Disable underscore_case warnings in this file
var chai = require( 'chai' );
var expect = chai.expect;
// var sinon = require( 'sinon' );
chai.use( require( 'sinon-chai' ) );

// var _ = require( 'lodash' );
var Model = require( 'ampersand-model' );
var LineModel = require( '../../../public/js/models/line' );

describe( 'LineModel', function() {
  var lineSampleData;
  var line;

  beforeEach(function() {
    lineSampleData = {
      name: 'Red Line',
      slug: 'red',
      routes: [ 'Red' ],
      // Red Line sample because it contains branching
      stations: [
        { name: 'Andrew', station: 'place-andrw', stops: [
          { dir: 0, dirName: 'Southbound', id: '70083' },
          { dir: 1, dirName: 'Northbound', id: '70084' }
        ] },
        { name: 'JFK/Umass', station: 'place-jfk', transfer: [ 'rail' ], stops: [{}, {}, {}, {}] },
        [
          [{ name: 'Savin Hill', station: 'place-shmnl', stops: [{}, {}] }],
          [
            { name: 'North Quincy', station: 'place-nqncy', stops: [{}, {}] },
            { name: 'Braintree', station: 'place-brntn', transfer: [ 'rail' ], stops: [
              { dir: 0, dirName: 'Southbound', id: '70105' },
              { dir: 1, dirName: 'Northbound', id: '70105' }
            ] }
          ]
        ]
      ]
    };

    line = new LineModel( lineSampleData );
  });

  it( 'should be an ampersand-model', function() {
    expect( line ).to.be.an.instanceof( Model );
  });

  describe( 'properties', function() {

    it( '"name" should be a string', function() {
      expect( line ).to.have.property( 'name' );
      expect( line.name ).to.be.a( 'string' );
      expect( line.name ).to.equal( 'Red Line' );
      expect(function() { line.name = 4; }).to.throw(); // Strict typing
    });

    it( '"slug" should be a string', function() {
      expect( line ).to.have.property( 'slug' );
      expect( line.slug ).to.be.a( 'string' );
      expect( line.slug ).to.equal( 'red' );
      expect(function() { line.slug = []; }).to.throw(); // Strict typing
    });

    it( '"routes" should be an array', function() {
      expect( line ).to.have.property( 'routes' );
      expect( line.routes ).to.be.an( 'array' );
      expect( line.routes ).to.deep.equal([ 'Red' ]);
      expect(function() { line.routes = {}; }).to.throw(); // Strict typing
    });

    it( '"stations" should be an array', function() {
      expect( line ).to.have.property( 'stations' );
      expect( line.stations ).to.be.an( 'array' );
      expect( line.stations.length ).to.equal( 3 );
      expect(function() { line.stations = 'foo'; }).to.throw(); // Strict typing
    });

  });

  describe( 'derived properties', function() {

    describe( '"stationsFlattened"', function() {
      it( 'should be an array', function() {
        expect( line ).to.have.property( 'stationsFlattened' );
        expect( line.stationsFlattened ).to.be.an( 'array' );
        expect( line.stationsFlattened.length ).to.equal( 5 );
      });

      it( 'should be updated whenever stations changes', function() {
        line.stations.pop();
        expect( line.stationsFlattened.length ).to.equal( 2 );
      });

    });

  });

  describe( 'station() method', function() {

    it( 'should return the station object with the provided parent station ID', function() {
      var station = line.station( 'place-jfk' );
      expect( station ).to.be.an( 'object' );
      expect( station.name ).to.equal( 'JFK/Umass' );
    });

    it( 'should be able to find stations that occur in nested line branches', function() {
      var station = line.station( 'place-shmnl' );
      expect( station ).to.be.an( 'object' );
      expect( station.name ).to.equal( 'Savin Hill' );
    });

  });

  describe( 'stopsByStation() method', function() {

    it( 'should return undefined if no matching station was found', function() {
      expect( line.stopsByStation( 'Grand Central Station NYC' ) ).to.be.undefined;
    });

    it( 'should return the array stop objects contained in the provided station', function() {
      var stops = line.stopsByStation( 'place-andrw' );
      expect( stops ).to.be.an( 'array' );
      expect( stops ).to.deep.equal([
        { dir: 0, dirName: 'Southbound', id: '70083' },
        { dir: 1, dirName: 'Northbound', id: '70084' }
      ]);
    });

    it( 'should de-dupe returned stops on ID to handle end-of-line terminal stations', function() {
      var stops = line.stopsByStation( 'place-brntn' );
      expect( stops ).to.be.an( 'array' );
      expect( stops ).to.deep.equal([
        { dir: 0, dirName: 'Southbound', id: '70105' }
      ]);
    });

  });

});
