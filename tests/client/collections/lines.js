'use strict';

/*jshint -W106 */// Disable underscore_case warnings in this file
var chai = require( 'chai' );
var expect = chai.expect;
// var sinon = require( 'sinon' );
chai.use( require( 'sinon-chai' ) );

var LinesCollection = require( '../../../public/js/collections/lines' );

describe( 'LinesCollection', function() {
  var lines;

  beforeEach(function() {
    lines = new LinesCollection([{
      slug: 'a',
      name: 'Line 1'
    }, {
      slug: 'b',
      name: 'Line 2'
    }, {
      slug: 'c',
      name: 'Line 3'
    }]);
  });

  describe( 'bySlug method', function() {

    it ( 'is defined', function() {
      expect( lines.bySlug ).to.exist;
      expect( lines.bySlug ).to.be.a( 'function' );
    });

    it( 'retrieves the first line in the collection with the matching slug', function() {
      var lineBySlug = lines.bySlug( 'c' );
      expect( lineBySlug.get( 'slug' ) ).to.equal( 'c' );
      expect( lineBySlug.get( 'name' ) ).to.equal( 'Line 3' );
      lineBySlug = lines.bySlug( 'a' );
      expect( lineBySlug.get( 'slug' ) ).to.equal( 'a' );
      expect( lineBySlug.get( 'name' ) ).to.equal( 'Line 1' );
    });

  });

});
