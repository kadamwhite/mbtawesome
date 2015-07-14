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
    dir: 0,
    dirName: 'Southbound',
    id: '70036'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70036'
  }]
}, {
  name: 'Malden Center',
  station: 'place-mlmnl',
  transfer: [ 'rail' ],
  // position: {
  //   lat: 42.4266,
  //   lon: -71.0741
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70034'
  }, {
    dir: 1,
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
    dir: 0,
    dirName: 'Southbound',
    id: '70032'
  }, {
    dir: 1,
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
    dir: 0,
    dirName: 'Southbound',
    id: '70278'
  }, {
    dir: 1,
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
    dir: 0,
    dirName: 'Southbound',
    id: '70030'
  }, {
    dir: 1,
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
    dir: 0,
    dirName: 'Southbound',
    id: '70028'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70029'
  }]
}, {
  name: 'North Station',
  station: 'place-north',
  transfer: [ 'green', 'rail' ],
  // position: {
  //   lat: 42.3656,
  //   lon: -71.0613
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70026'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70027'
  }]
}, {
  name: 'Haymarket',
  station: 'place-haecl',
  transfer: [ 'green' ],
  // position: {
  //   lat: 42.363,
  //   lon: -71.0583
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70024'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70025'
  }]
}, {
  name: 'State Street',
  station: 'place-state',
  transfer: [ 'blue' ],
  // position: {
  //   lat: 42.359,
  //   lon: -71.0576
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70022'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70023'
  }]
}, {
  name: 'Downtown Crossing',
  station: 'place-dwnxg',
  transfer: [ 'red', 'silver' ],
  // position: {
  //   lat: 42.3555,
  //   lon: -71.0602
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70020'
  }, {
    dir: 1,
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
    dir: 0,
    dirName: 'Southbound',
    id: '70018'
  }, {
    dir: 1,
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
    dir: 0,
    dirName: 'Southbound',
    id: '70016'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70017'
  }]
}, {
  name: 'Back Bay',
  station: 'place-bbsta',
  transfer: [ 'rail' ],
  // position: {
  //   lat: 42.3474,
  //   lon: -71.0757
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70014'
  }, {
    dir: 1,
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
    dir: 0,
    dirName: 'Southbound',
    id: '70012'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70013'
  }]
}, {
  name: 'Ruggles',
  station: 'place-rugg',
  transfer: [ 'rail' ],
  // position: {
  //   lat: 42.3364,
  //   lon: -71.089
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70010'
  }, {
    dir: 1,
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
    dir: 0,
    dirName: 'Southbound',
    id: '70008'
  }, {
    dir: 1,
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
    dir: 0,
    dirName: 'Southbound',
    id: '70006'
  }, {
    dir: 1,
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
    dir: 0,
    dirName: 'Southbound',
    id: '70004'
  }, {
    dir: 1,
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
    dir: 0,
    dirName: 'Southbound',
    id: '70002'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70003'
  }]
}, {
  name: 'Forest Hills',
  station: 'place-forhl',
  transfer: [ 'rail' ],
  // position: {
  //   lat: 42.3005,
  //   lon: -71.1137
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70001'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70001'
  }]
}];

module.exports = {
  name: 'Orange Line',
  slug: 'orange',
  routes: [ 'Orange' ],
  stops: stations
};
