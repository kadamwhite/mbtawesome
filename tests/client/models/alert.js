'use strict';

/*jshint -W106 */// Disable underscore_case warnings in this file
var chai = require( 'chai' );
var expect = chai.expect;

// var _ = require( 'lodash' );
var Model = require( 'ampersand-model' );
var AlertModel = require( '../../../public/js/models/alert' );

describe( 'AlertModel', function() {
  var alertSampleData;
  var alert;

  beforeEach(function() {
    alertSampleData = {
      alert_id: 88088,
      effect_name: 'Station Issue',
      effect: 'UNKNOWN_EFFECT',
      cause_name: 'construction',
      cause: 'CONSTRUCTION',
      header_text: 'DTX: The Franklin St entrance will be closed on Monday, August 10...',
      short_header_text: 'DTX: The Franklin St entrance will be closed',
      description_text: 'Customers desiring to enter and exit...',
      severity: 'Minor',
      created_dt: '1438373070',
      last_modified_dt: '1439920033',
      service_effect_text: 'Change at Downtown Crossing',
      timeframe_text: 'ongoing',
      alert_lifecycle: 'Ongoing',
      effect_periods: [{
        effect_start: '1439195400',
        effect_end: ''
      }],
      'affected_services': {}
    };

    alert = new AlertModel( alertSampleData );
  });

  it( 'should be an ampersand-model', function() {
    expect( alert ).to.be.an.instanceof( Model );
  });

  describe( 'properties', function() {

    it( '"effect_name" should be a string', function() {
      expect( alert ).to.have.property( 'effect_name' );
      expect( alert.effect_name ).to.be.a( 'string' );
      expect( alert.effect_name ).to.equal( 'Station Issue' );
      expect(function() { alert.effect_name = 4; }).to.throw(); // Strict typing
    });

    it( '"header_text" should be a string', function() {
      expect( alert ).to.have.property( 'header_text' );
      expect( alert.header_text ).to.be.a( 'string' );
      expect( alert.header_text ).to.equal(
        'DTX: The Franklin St entrance will be closed on Monday, August 10...'
      );
      expect(function() { alert.header_text = {}; }).to.throw(); // Strict typing
    });

    it( '"severity" should be a string', function() {
      expect( alert ).to.have.property( 'severity' );
      expect( alert.severity ).to.be.a( 'string' );
      expect( alert.severity ).to.equal( 'Minor' );
      expect(function() { alert.severity = []; }).to.throw(); // Strict typing
    });

    it( '"effect_periods" should be a array', function() {
      expect( alert ).to.have.property( 'effect_periods' );
      expect( alert.effect_periods ).to.be.an( 'array' );
      expect( alert.effect_periods ).to.deep.equal([{
        effect_start: '1439195400',
        effect_end: ''
      }]);
      expect(function() { alert.effect_periods = 'foo'; }).to.throw(); // Strict typing
    });

  });

  describe( 'derived properties', function() {

    describe( '"inEffect"', function() {
      it( 'should be a boolean', function() {
        expect( alert ).to.have.property( 'inEffect' );
        expect( alert.inEffect ).to.be.a( 'boolean' );
      });

      it( 'should be updated whenever effect_periods changes', function() {
        // Change the window to one that has ended
        alert.effect_periods = [{
          effect_start: '1439195400',
          effect_end: '1441580000'
        }];
        expect( alert.inEffect ).to.equal( false );
      });

      it( 'should be true for alerts that span the current time', function() {
        alert.effect_periods = [{
          // Start one day ago
          effect_start: '' + Math.floor( new Date() / 1000 - 86400 ),
          // End one day from now
          effect_end: '' + Math.floor( new Date() / 1000 + 86400 )
        }];
        expect( alert.inEffect ).to.equal( true );
      });

      it( 'should be true for alerts starting in the past with no end bound', function() {
        alert.effect_periods = [{
          // Start one day ago
          effect_start: '' + Math.floor( new Date() / 1000 - 86400 ),
          // Unbounded end
          effect_end: ''
        }];
        expect( alert.inEffect ).to.equal( true );
      });

      it( 'should be true for alerts ending in the future with no start bound', function() {
        alert.effect_periods = [{
          // Unbounded start
          effect_start: '',
          // End one day from now day ago
          effect_end: '' + Math.floor( new Date() / 1000 + 86400 )
        }];
        expect( alert.inEffect ).to.equal( true );
      });

      it( 'should be false for alerts that have not yet begun', function() {
        alert.effect_periods = [{
          // Start one day from now
          effect_start: '' + Math.floor( new Date() / 1000 + 86400 ),
          // Unbounded end
          effect_end: ''
        }];
        expect( alert.inEffect ).to.equal( false );
      });

      it( 'should be false for alerts that have already ended', function() {
        alert.effect_periods = [{
          // Unbounded start
          effect_start: '',
          // End one day ago
          effect_end: '' + Math.floor( new Date() / 1000 - 86400 )
        }];
        expect( alert.inEffect ).to.equal( false );
      });

    });

  });

});
