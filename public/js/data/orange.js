/*jshint -W106 */ // Disable underscore_case warnings
'use strict';

var stations = [{
  name: 'Oak Grove',
  station: 'place-ogmnl',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70036'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70036'
  }],
  position: {
    lat: 42.4367,
    lon: -71.0711
  }
}, {
  name: 'Malden Center',
  station: 'place-mlmnl',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70034'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70035'
  }],
  position: {
    lat: 42.4266,
    lon: -71.0741
  }
}, {
  name: 'Wellington',
  station: 'place-welln',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70032'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70033'
  }],
  position: {
    lat: 42.4024,
    lon: -71.0771
  }
}, {
  name: 'Assembly',
  station: 'place-astao',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70278'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70279'
  }],
  position: {
    lat: 42.3928,
    lon: -71.0773
  }
}, {
  name: 'Sullivan Square',
  station: 'place-sull',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70030'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70031'
  }],
  position: {
    lat: 42.384,
    lon: -71.077
  }
}, {
  name: 'Community College',
  station: 'place-ccmnl',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70028'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70029'
  }],
  position: {
    lat: 42.3736,
    lon: -71.0695
  }
}, {
  name: 'North Station',
  station: 'place-north',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70026'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70027'
  }],
  position: {
    lat: 42.3656,
    lon: -71.0613
  }
}, {
  name: 'Haymarket',
  station: 'place-haecl',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70024'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70025'
  }],
  position: {
    lat: 42.363,
    lon: -71.0583
  }
}, {
  name: 'State Street',
  station: 'place-state',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70022'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70023'
  }],
  position: {
    lat: 42.359,
    lon: -71.0576
  }
}, {
  name: 'Downtown Crossing',
  station: 'place-dwnxg',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70020'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70021'
  }],
  position: {
    lat: 42.3555,
    lon: -71.0602
  }
}, {
  name: 'Chinatown',
  station: 'place-chncl',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70018'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70019'
  }],
  position: {
    lat: 42.3525,
    lon: -71.0628
  }
}, {
  name: 'Tufts Medical Center',
  station: 'place-tumnl',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70016'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70017'
  }],
  position: {
    lat: 42.3497,
    lon: -71.0639
  }
}, {
  name: 'Back Bay',
  station: 'place-bbsta',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70014'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70015'
  }],
  position: {
    lat: 42.3474,
    lon: -71.0757
  }
}, {
  name: 'Massachusetts Ave.',
  station: 'place-masta',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70012'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70013'
  }],
  position: {
    lat: 42.3415,
    lon: -71.0834
  }
}, {
  name: 'Ruggles',
  station: 'place-rugg',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70010'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70011'
  }],
  position: {
    lat: 42.3364,
    lon: -71.089
  }
}, {
  name: 'Roxbury Crossing',
  station: 'place-rcmnl',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70008'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70009'
  }],
  position: {
    lat: 42.3314,
    lon: -71.0955
  }
}, {
  name: 'Jackson Square',
  station: 'place-jaksn',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70006'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70007'
  }],
  position: {
    lat: 42.3231,
    lon: -71.0996
  }
}, {
  name: 'Stony Brook',
  station: 'place-sbmnl',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70004'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70005'
  }],
  position: {
    lat: 42.3171,
    lon: -71.1042
  }
}, {
  name: 'Green Street',
  station: 'place-grnst',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70002'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70003'
  }],
  position: {
    lat: 42.3105,
    lon: -71.1074
  }
}, {
  name: 'Forest Hills',
  station: 'place-forhl',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70001'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70001'
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
