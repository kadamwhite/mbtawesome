'use strict';

/*jshint -W106 */// Disable underscore_case warnings in this file
var chai = require( 'chai' );
var expect = chai.expect;
// var sinon = require( 'sinon' );
chai.use( require( 'sinon-chai' ) );
var _ = require( 'lodash' );

var Model = require( 'ampersand-model' );
var Collection = require( 'ampersand-rest-collection' );
var TripModel = require( '../../../public/js/models/trip' );
var TripsCollection = require( '../../../public/js/collections/trips' );

describe( 'TripModel', function() {
  var tripSampleData;
  var trip;

  beforeEach(function() {
    tripSampleData = {
      direction: 1,
      headsign: 'Alewife',
      id: '98369808',
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
    trip = new TripModel( tripSampleData );
  });

  it( 'should extend ampersand-model', function() {
    expect( trip ).to.be.an.instanceof( Model );
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

    // Should we provide the IDs to multiple stops that this trip
    // visits, it should return the lowest one regardless of the
    // order in which the stops occur.
    it ( 'returns the shortest time out of any matching stops', function() {
      // Alewife, Davis & Porter
      var eta = trip.secondsToAny( [ '70061', '70066', '70064' ] );
      expect( eta ).to.equal( 376 );

      // Set up trips in the wrong order
      trip.set( 'stops', [{
        // Alewife
        id: '70061',
        seconds: 664
      }, {
        // Davis
        id: '70064',
        seconds: 503
      }]);

      eta = trip.secondsToAny( [ '70061', '70064' ] );

      expect( eta ).to.equal( 503 );
    });

  });

  describe( 'approaching method', function() {

    it ( 'is defined', function() {
      expect( trip.approaching ).to.exist;
      expect( trip.approaching ).to.be.a( 'function' );
    });

    it ( 'returns true if the provided station is the next stop', function() {
      var approaching = trip.approaching( '70068' ); // Harvard
      expect( approaching ).to.equal( true );
    });

    it ( 'returns true if the provided station is the next stop', function() {
      var approaching = trip.approaching( '70064' ); // Davis
      expect( approaching ).to.equal( false );
    });

  });

  describe( 'visits method', function() {

    it( 'is defined', function() {
      expect( trip.visits ).to.exist;
      expect( trip.visits ).to.be.a( 'function' );
    });

    it( 'returns true if the trip visits the provided stop', function() {
      var visits = trip.visits( '70064' ); // Davis
      expect( visits ).to.equal( true );
    });

    it( 'returns false if the trip visits the provided stop', function() {
      var visits = trip.visits( '70078' ); // DTX
      expect( visits ).to.equal( false );
    });

  });

  describe( 'active property', function() {

    it ( 'is defined', function() {
      expect( trip ).to.have.property( 'active' );
      expect( trip.active ).to.be.a( 'boolean' );
    });

    it ( 'returns true if the trip has a vehicle', function() {
      expect( trip.active ).to.equal( true );
    });

    it ( 'returns false if the trip does not have a vehicle', function() {
      trip.unset( 'vehicle' );
      expect( trip.active ).to.equal( false );
    });

  });

  describe( 'scheduled property', function() {

    it ( 'is defined', function() {
      expect( trip ).to.have.property( 'scheduled' );
      expect( trip.scheduled ).to.be.a( 'boolean' );
    });

    it ( 'returns true if the trip does not have a vehicle', function() {
      trip.unset( 'vehicle' );
      expect( trip.scheduled ).to.equal( true );
    });

    it ( 'returns false if the trip has a vehicle', function() {
      expect( trip.scheduled ).to.equal( false );
    });

  });

  describe( 'timeUntil method', function() {

    it ( 'is defined', function() {
      expect( trip.timeUntil ).to.exist;
      expect( trip.timeUntil ).to.be.a( 'function' );
    });

    it( 'returns a string time (in minutes) until a train arrives at a station', function() {
      trip.set( 'stops', [{
        id: 'foo',
        seconds: 600
      }]);
      var message = trip.timeUntil( 'foo' );
      expect( message ).to.equal( '10 min' );

      trip.set( 'stops', [{
        id: 'foo',
        seconds: 91
      }]);
      message = trip.timeUntil( 'foo' );
      expect( message ).to.equal( '1 min' );
    });

    it( 'rounds times down to the nearest minute', function() {
      trip.set( 'stops', [{
        id: 'foo',
        seconds: 645
      }]);
      var message = trip.timeUntil( 'foo' );
      expect( message ).to.equal( '10 min' );
    });

    it( 'returns a special string when a train is arriving', function() {
      trip.set( 'stops', [{
        id: 'foo',
        seconds: 89
      }]);
      var message = trip.timeUntil( 'foo' );
      expect( message ).to.equal( 'Approaching' );

      trip.set( 'stops', [{
        id: 'foo',
        seconds: 31
      }]);
      message = trip.timeUntil( 'foo' );
      expect( message ).to.equal( 'Approaching' );
    });

    it( 'returns a special string when a train is arriving', function() {
      trip.set( 'stops', [{
        id: 'foo',
        seconds: 29
      }]);
      var message = trip.timeUntil( 'foo' );
      expect( message ).to.equal( 'Arriving' );

      trip.set( 'stops', [{
        id: 'foo',
        seconds: 0
      }]);
      message = trip.timeUntil( 'foo' );
      expect( message ).to.equal( 'Arriving' );
    });

  });

  describe( 'messageForStation method', function() {

    it ( 'is defined', function() {
      expect( trip.messageForStation ).to.exist;
      expect( trip.messageForStation ).to.be.a( 'function' );
    });

    it( 'returns a readable message for trains en route', function() {
      trip.set( 'stops', [{
        id: 'foo',
        seconds: 480
      }]);
      var message = trip.messageForStation( 'foo' );
      expect( message ).to.equal( 'Alewife train in 8 min' );
    });

    it( 'returns a readable message for approaching trains', function() {
      trip.set( 'stops', [{
        id: 'foo',
        seconds: 80
      }]);
      var message = trip.messageForStation( 'foo' );
      expect( message ).to.equal( 'Alewife train approaching' );
    });

    it( 'returns a readable message for arriving trains', function() {
      trip.set( 'stops', [{
        id: 'foo',
        seconds: 20
      }]);
      var message = trip.messageForStation( 'foo' );
      expect( message ).to.equal( 'Alewife train arriving' );
    });

  });

  describe( 'stops collection', function() {

    it ( 'is defined', function() {
      expect( trip.stops ).to.exist;
      expect( trip.stops ).to.be.an.instanceof( Collection );
    });

  });

  describe( 'toJSON method', function() {

    it ( 'extends the native Backbone.Model toJSON', function() {
      var defaultOutput = new Model( trip.attributes ).toJSON();
      var output = trip.toJSON();

      // Can't use deepEqual b/c trip.toJSON extends default:
      // instead, check that all default properties still exist
      _.forEach( defaultOutput, function( val, key ) {
        expect( output[ key ] ).to.equal( val );
      });
    });

    it ( 'adds a .scheduled property based on the inverse of .active()', function() {
      var output = trip.toJSON();
      expect( output.scheduled ).to.equal( false );
      trip.unset( 'vehicle' );
      output = trip.toJSON();
      expect( output.scheduled ).to.equal( true );
    });

  });

  describe( 'AJAX refresh behavior', function() {
    var tripsCollection;

    beforeEach(function() {
      tripsCollection = new TripsCollection([ tripSampleData ], {
        line: {
          slug: 'red'
        }
      });
    });

    it( 'properly persists updated stop prediction data', function() {
      expect(function() {
        // Simulate a subsequent API call returning updated arrival countdown times
        tripsCollection.set([{
          direction: 1,
          headsign: 'Alewife',
          id: '98369808',
          stops: tripSampleData.stops.map(function( stop ) {
            return _.extend({
              seconds: stop.seconds - 20
            }, _.pick( stop, [ 'eta', 'id', 'seq' ]));
          })
        }], {
          // Simulate the "parse" option that the rest mixin passes:
          // If "stops" is not a collection of actual models, "parse" will fail & throw
          parse: true
        });
      }).not.to.throw();
      expect( tripsCollection.first().stops.first().seconds ).to.equal( 171 );
    });

  });

});
