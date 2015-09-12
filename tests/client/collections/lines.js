'use strict';

/*jshint -W106 */// Disable underscore_case warnings in this file
var chai = require( 'chai' );
var expect = chai.expect;

var LinesCollection = require( '../../../public/js/collections/lines' );
var LineModel = require( '../../../public/js/models/line' );

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

  it( 'creates LineModel instances for each provided data object', function() {
    expect( lines.length ).to.equal( 3 );
    lines.forEach(function( line ) {
      expect( line ).to.be.an.instanceof( LineModel );
    });
  });

});
