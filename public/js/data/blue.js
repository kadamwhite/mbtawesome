/*jshint -W106 */ // Disable underscore_case warnings
'use strict';

var stations = [{
  name: 'Wonderland',
  station: 'place-wondl',
  // position: {
  //   lat: 42.4134,
  //   lon: -70.9916
  // },
  stops: [{
    direction: 0,
    dirName: 'Westbound',
    id: '70060'
  }, {
    direction: 1,
    dirName: 'Eastbound',
    id: '70060'
  }]
}, {
  name: 'Revere Beach',
  station: 'place-rbmnl',
  // position: {
  //   lat: 42.4078,
  //   lon: -70.9925
  // },
  stops: [{
    direction: 0,
    dirName: 'Westbound',
    id: '70057'
  }, {
    direction: 1,
    dirName: 'Eastbound',
    id: '70058'
  }]
}, {
  name: 'Beachmont',
  station: 'place-bmmnl',
  // position: {
  //   lat: 42.3975,
  //   lon: -70.9923
  // },
  stops: [{
    direction: 0,
    dirName: 'Westbound',
    id: '70055'
  }, {
    direction: 1,
    dirName: 'Eastbound',
    id: '70056'
  }]
}, {
  name: 'Suffolk Downs',
  station: 'place-sdmnl',
  // position: {
  //   lat: 42.3905,
  //   lon: -70.9971
  // },
  stops: [{
    direction: 0,
    dirName: 'Westbound',
    id: '70053'
  }, {
    direction: 1,
    dirName: 'Eastbound',
    id: '70054'
  }]
}, {
  name: 'Orient Heights',
  station: 'place-orhte',
  // position: {
  //   lat: 42.3869,
  //   lon: -71.0047
  // },
  stops: [{
    direction: 0,
    dirName: 'Westbound',
    id: '70051'
  }, {
    direction: 1,
    dirName: 'Eastbound',
    id: '70052'
  }]
}, {
  name: 'Wood Island',
  station: 'place-wimnl',
  // position: {
  //   lat: 42.3796,
  //   lon: -71.0229
  // },
  stops: [{
    direction: 0,
    dirName: 'Westbound',
    id: '70049'
  }, {
    direction: 1,
    dirName: 'Eastbound',
    id: '70050'
  }]
}, {
  name: 'Airport',
  station: 'place-aport',
  // position: {
  //   lat: 42.3743,
  //   lon: -71.0304
  // },
  stops: [{
    direction: 0,
    dirName: 'Westbound',
    id: '70047'
  }, {
    direction: 1,
    dirName: 'Eastbound',
    id: '70048'
  }]
}, {
  name: 'Maverick',
  station: 'place-mvbcl',
  // position: {
  //   lat: 42.3691,
  //   lon: -71.0395
  // },
  stops: [{
    direction: 0,
    dirName: 'Westbound',
    id: '70045'
  }, {
    direction: 1,
    dirName: 'Eastbound',
    id: '70046'
  }]
}, {
  name: 'Aquarium',
  station: 'place-aqucl',
  // position: {
  //   lat: 42.3598,
  //   lon: -71.0517
  // },
  stops: [{
    direction: 0,
    dirName: 'Westbound',
    id: '70043'
  }, {
    direction: 1,
    dirName: 'Eastbound',
    id: '70044'
  }]
}, {
  name: 'State Street',
  station: 'place-state',
  // position: {
  //   lat: 42.359,
  //   lon: -71.0576
  // },
  stops: [{
    direction: 0,
    dirName: 'Westbound',
    id: '70041'
  }, {
    direction: 1,
    dirName: 'Eastbound',
    id: '70042'
  }]
}, {
  name: 'Bowdoin',
  station: 'place-bomnl',
  // position: {
  //   lat: 42.3614,
  //   lon: -71.062
  // },
  stops: [{
    direction: 0,
    dirName: 'Westbound',
    id: '70038'
  }, {
    direction: 1,
    dirName: 'Eastbound',
    id: '70038'
  }]
}];

module.exports = {
  name: 'Blue Line',
  slug: 'blue',
  routes: [ '946_', '948_' ],
  stops: stations
};
