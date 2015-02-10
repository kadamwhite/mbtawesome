/*jshint -W106 */ // Disable underscore_case warnings
'use strict';

var stations = [{
  name: 'Wonderland',
  station: 'place-wondl',
  stops: [{
    direction_id: 0,
    direction_name: 'Westbound',
    stop_id: '70060'
  }, {
    direction_id: 1,
    direction_name: 'Eastbound',
    stop_id: '70060'
  }],
  position: {
    lat: 42.4134,
    lon: -70.9916
  }
}, {
  name: 'Revere Beach',
  station: 'place-rbmnl',
  stops: [{
    direction_id: 0,
    direction_name: 'Westbound',
    stop_id: '70057'
  }, {
    direction_id: 1,
    direction_name: 'Eastbound',
    stop_id: '70058'
  }],
  position: {
    lat: 42.4078,
    lon: -70.9925
  }
}, {
  name: 'Beachmont',
  station: 'place-bmmnl',
  stops: [{
    direction_id: 0,
    direction_name: 'Westbound',
    stop_id: '70055'
  }, {
    direction_id: 1,
    direction_name: 'Eastbound',
    stop_id: '70056'
  }],
  position: {
    lat: 42.3975,
    lon: -70.9923
  }
}, {
  name: 'Suffolk Downs',
  station: 'place-sdmnl',
  stops: [{
    direction_id: 0,
    direction_name: 'Westbound',
    stop_id: '70053'
  }, {
    direction_id: 1,
    direction_name: 'Eastbound',
    stop_id: '70054'
  }],
  position: {
    lat: 42.3905,
    lon: -70.9971
  }
}, {
  name: 'Orient Heights',
  station: 'place-orhte',
  stops: [{
    direction_id: 0,
    direction_name: 'Westbound',
    stop_id: '70051'
  }, {
    direction_id: 1,
    direction_name: 'Eastbound',
    stop_id: '70052'
  }],
  position: {
    lat: 42.3869,
    lon: -71.0047
  }
}, {
  name: 'Wood Island',
  station: 'place-wimnl',
  stops: [{
    direction_id: 0,
    direction_name: 'Westbound',
    stop_id: '70049'
  }, {
    direction_id: 1,
    direction_name: 'Eastbound',
    stop_id: '70050'
  }],
  position: {
    lat: 42.3796,
    lon: -71.0229
  }
}, {
  name: 'Airport',
  station: 'place-aport',
  stops: [{
    direction_id: 0,
    direction_name: 'Westbound',
    stop_id: '70047'
  }, {
    direction_id: 1,
    direction_name: 'Eastbound',
    stop_id: '70048'
  }],
  position: {
    lat: 42.3743,
    lon: -71.0304
  }
}, {
  name: 'Maverick',
  station: 'place-mvbcl',
  stops: [{
    direction_id: 0,
    direction_name: 'Westbound',
    stop_id: '70045'
  }, {
    direction_id: 1,
    direction_name: 'Eastbound',
    stop_id: '70046'
  }],
  position: {
    lat: 42.3691,
    lon: -71.0395
  }
}, {
  name: 'Aquarium',
  station: 'place-aqucl',
  stops: [{
    direction_id: 0,
    direction_name: 'Westbound',
    stop_id: '70043'
  }, {
    direction_id: 1,
    direction_name: 'Eastbound',
    stop_id: '70044'
  }],
  position: {
    lat: 42.3598,
    lon: -71.0517
  }
}, {
  name: 'State Street',
  station: 'place-state',
  stops: [{
    direction_id: 0,
    direction_name: 'Westbound',
    stop_id: '70041'
  }, {
    direction_id: 1,
    direction_name: 'Eastbound',
    stop_id: '70042'
  }],
  position: {
    lat: 42.359,
    lon: -71.0576
  }
}, {
  name: 'Bowdoin',
  station: 'place-bomnl',
  stops: [{
    direction_id: 0,
    direction_name: 'Westbound',
    stop_id: '70038'
  }, {
    direction_id: 1,
    direction_name: 'Eastbound',
    stop_id: '70038'
  }],
  position: {
    lat: 42.3614,
    lon: -71.062
  }
}];

module.exports = {
  name: 'Blue Line',
  slug: 'blue',
  routes: [ '946_', '948_' ],
  stops: stations
};
