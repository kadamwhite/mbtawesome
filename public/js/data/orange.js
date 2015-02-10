/*jshint -W106 */ // Disable underscore_case warnings
'use strict';

var stations = [{
  name: 'Oak Grove',
  station: 'place-ogmnl',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70036'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70036'
  }],
  position: {
    lat: 42.4367,
    lon: -71.0711
  }
}, {
  name: 'Malden Center',
  station: 'place-mlmnl',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70034'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70035'
  }],
  position: {
    lat: 42.4266,
    lon: -71.0741
  }
}, {
  name: 'Wellington',
  station: 'place-welln',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70032'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70033'
  }],
  position: {
    lat: 42.4024,
    lon: -71.0771
  }
}, {
  name: 'Assembly',
  station: 'place-astao',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70278'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70279'
  }],
  position: {
    lat: 42.3928,
    lon: -71.0773
  }
}, {
  name: 'Sullivan Square',
  station: 'place-sull',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70030'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70031'
  }],
  position: {
    lat: 42.384,
    lon: -71.077
  }
}, {
  name: 'Community College',
  station: 'place-ccmnl',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70028'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70029'
  }],
  position: {
    lat: 42.3736,
    lon: -71.0695
  }
}, {
  name: 'North Station',
  station: 'place-north',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70026'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70027'
  }],
  position: {
    lat: 42.3656,
    lon: -71.0613
  }
}, {
  name: 'Haymarket',
  station: 'place-haecl',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70024'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70025'
  }],
  position: {
    lat: 42.363,
    lon: -71.0583
  }
}, {
  name: 'State Street',
  station: 'place-state',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70022'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70023'
  }],
  position: {
    lat: 42.359,
    lon: -71.0576
  }
}, {
  name: 'Downtown Crossing',
  station: 'place-dwnxg',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70020'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70021'
  }],
  position: {
    lat: 42.3555,
    lon: -71.0602
  }
}, {
  name: 'Chinatown',
  station: 'place-chncl',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70018'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70019'
  }],
  position: {
    lat: 42.3525,
    lon: -71.0628
  }
}, {
  name: 'Tufts Medical Center',
  station: 'place-tumnl',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70016'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70017'
  }],
  position: {
    lat: 42.3497,
    lon: -71.0639
  }
}, {
  name: 'Back Bay',
  station: 'place-bbsta',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70014'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70015'
  }],
  position: {
    lat: 42.3474,
    lon: -71.0757
  }
}, {
  name: 'Massachusetts Ave.',
  station: 'place-masta',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70012'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70013'
  }],
  position: {
    lat: 42.3415,
    lon: -71.0834
  }
}, {
  name: 'Ruggles',
  station: 'place-rugg',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70010'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70011'
  }],
  position: {
    lat: 42.3364,
    lon: -71.089
  }
}, {
  name: 'Roxbury Crossing',
  station: 'place-rcmnl',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70008'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70009'
  }],
  position: {
    lat: 42.3314,
    lon: -71.0955
  }
}, {
  name: 'Jackson Square',
  station: 'place-jaksn',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70006'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70007'
  }],
  position: {
    lat: 42.3231,
    lon: -71.0996
  }
}, {
  name: 'Stony Brook',
  station: 'place-sbmnl',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70004'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70005'
  }],
  position: {
    lat: 42.3171,
    lon: -71.1042
  }
}, {
  name: 'Green Street',
  station: 'place-grnst',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70002'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70003'
  }],
  position: {
    lat: 42.3105,
    lon: -71.1074
  }
}, {
  name: 'Forest Hills',
  station: 'place-forhl',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70001'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70001'
  }],
  position: {
    lat: 42.3005,
    lon: -71.1137
  }
}];

module.exports = {
  name: 'Orange Line',
  slug: 'orange',
  routes: [ '901_', '913_' ],
  stops: stations
};
