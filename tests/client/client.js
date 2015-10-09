'use strict';

var chai = require( 'chai' );
var expect = chai.expect;
var sinon = require( 'sinon' );
chai.use( require( 'sinon-chai' ) );
var proxyquire = require( 'proxyquire' );

describe( 'client application', function() {
  var app;
  var routerStartSpy;

  beforeEach(function() {
    routerStartSpy = sinon.stub();
    app = proxyquire( '../../public/js/client', {
      './router': {
        start: routerStartSpy,
        '@noCallThru': true
      },
      './views/window-view': {
        '@noCallThru': true
      }
    });
  });

  it( 'starts the router object', function() {
    expect( routerStartSpy ).to.have.been.called;
  });

  it( 'instructs the router to use html5 mode', function() {
    expect( routerStartSpy ).to.have.been.calledWith({
      autoprefix: false,
      html5: true
    });
  });

  it( 'exports nothing: app objects considered harmful', function() {
    expect( Object.keys( app ) ).to.deep.equal( [] );
  });

});
