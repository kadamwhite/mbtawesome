/*jshint -W106 */ // Disable underscore_case warnings
'use strict';

var stations = [{
  name: 'Oak Grove',
  station: 'place-ogmnl',
  // position: {
  //   lat: 42.4367,
  //   lon: -71.0711
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70036'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70036'
  }]
}, {
  name: 'Malden Center',
  station: 'place-mlmnl',
  // position: {
  //   lat: 42.4266,
  //   lon: -71.0741
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70034'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70035'
  }]
}, {
  name: 'Wellington',
  station: 'place-welln',
  // position: {
  //   lat: 42.4024,
  //   lon: -71.0771
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70032'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70033'
  }]
}, {
  name: 'Assembly',
  station: 'place-astao',
  // position: {
  //   lat: 42.3928,
  //   lon: -71.0773
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70278'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70279'
  }]
}, {
  name: 'Sullivan Square',
  station: 'place-sull',
  // position: {
  //   lat: 42.384,
  //   lon: -71.077
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70030'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70031'
  }]
}, {
  name: 'Community College',
  station: 'place-ccmnl',
  // position: {
  //   lat: 42.3736,
  //   lon: -71.0695
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70028'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70029'
  }]
}, {
  name: 'North Station',
  station: 'place-north',
  // position: {
  //   lat: 42.3656,
  //   lon: -71.0613
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70026'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70027'
  }]
}, {
  name: 'Haymarket',
  station: 'place-haecl',
  // position: {
  //   lat: 42.363,
  //   lon: -71.0583
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70024'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70025'
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
    dirName: 'Southbound',
    id: '70022'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70023'
  }]
}, {
  name: 'Downtown Crossing',
  station: 'place-dwnxg',
  // position: {
  //   lat: 42.3555,
  //   lon: -71.0602
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70020'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70021'
  }]
}, {
  name: 'Chinatown',
  station: 'place-chncl',
  // position: {
  //   lat: 42.3525,
  //   lon: -71.0628
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70018'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70019'
  }]
}, {
  name: 'Tufts Medical Center',
  station: 'place-tumnl',
  // position: {
  //   lat: 42.3497,
  //   lon: -71.0639
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70016'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70017'
  }]
}, {
  name: 'Back Bay',
  station: 'place-bbsta',
  // position: {
  //   lat: 42.3474,
  //   lon: -71.0757
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70014'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70015'
  }]
}, {
  name: 'Massachusetts Ave.',
  station: 'place-masta',
  // position: {
  //   lat: 42.3415,
  //   lon: -71.0834
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70012'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70013'
  }]
}, {
  name: 'Ruggles',
  station: 'place-rugg',
  // position: {
  //   lat: 42.3364,
  //   lon: -71.089
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70010'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70011'
  }]
}, {
  name: 'Roxbury Crossing',
  station: 'place-rcmnl',
  // position: {
  //   lat: 42.3314,
  //   lon: -71.0955
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70008'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70009'
  }]
}, {
  name: 'Jackson Square',
  station: 'place-jaksn',
  // position: {
  //   lat: 42.3231,
  //   lon: -71.0996
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70006'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70007'
  }]
}, {
  name: 'Stony Brook',
  station: 'place-sbmnl',
  // position: {
  //   lat: 42.3171,
  //   lon: -71.1042
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70004'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70005'
  }]
}, {
  name: 'Green Street',
  station: 'place-grnst',
  // position: {
  //   lat: 42.3105,
  //   lon: -71.1074
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70002'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70003'
  }]
}, {
  name: 'Forest Hills',
  station: 'place-forhl',
  // position: {
  //   lat: 42.3005,
  //   lon: -71.1137
  // },
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70001'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70001'
  }]
}];

module.exports = {
  name: 'Orange Line',
  slug: 'orange',
  routes: [ '901_', '913_' ],
  stops: stations
};
