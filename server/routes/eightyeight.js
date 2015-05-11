'use strict';

var express = require( 'express' );
var router = express.Router();
/*jshint -W079 */// Suppress warning about redefiniton of `Promise`
var Promise = require( 'bluebird' );

// var pageTitle = require( '../services/page-title' );
var _ = require( 'lodash' );
var mbtapi = require( '../lib/api-query' );

// 15 second cache expiry
var shortCache = require( '../services/api/_short-cache' );

/* GET home page. */
function busRoute( req, res, next ) {
  var routeNum = req.params.route;
  Promise.props({
    predictions: mbtapi.predictionsByRoute( routeNum )
  }).then(function( context ) {
    var inbound = _.findWhere( context.predictions.direction, {
      direction_id: '1'
    });
    var approaching = _.filter( inbound.trip, function( trip ) {
      return _.any( trip.stop, function( stop ) {
        return stop.stop_id === '2681';
      });
    });
    var timeTil = _.map( approaching, function( trip ) {
      var benton = _.findWhere( trip.stop, {
        stop_id: '2681'
      });
      var tilBenton;
      try {
        tilBenton = +benton.pre_away;
      } catch(e) {
        console.error( e );
      }
      return {
        name: trip.trip_name,
        minutes: parseInt( tilBenton / 60, 10 ),
        pre_away: benton.pre_away
      }
    })
    res.send( timeTil );
  }).catch( next );
}

module.exports = busRoute;
