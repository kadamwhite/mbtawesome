/*jshint -W106 */ // Disable underscore_case warnings
'use strict';

var stations = [{
  name: 'North Station',
  station: 'place-north',
  transfer: [ 'orange', 'rail' ],
  // position: {
  //   lat: 42.365577,
  //   lon: -71.06129
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70206'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70205'
  }]
}, {
  name: 'Haymarket',
  station: 'place-haecl',
  transfer: [ 'orange' ],
  // position: {
  //   lat: 42.363021,
  //   lon: -71.05829
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70204'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70203'
  }]
}, {
  name: 'Park Street',
  station: 'place-pktrm',
  transfer: [ 'red' ],
  // position: {
  //   lat: 42.35639457,
  //   lon: -71.0624242
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70198'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70200'
  }]
}, {
  name: 'Boylston',
  station: 'place-boyls',
  transfer: [ 'silver' ],
  // position: {
  //   lat: 42.35302,
  //   lon: -71.06459
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70159'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70158'
  }]
}, {
  name: 'Arlington',
  station: 'place-armnl',
  // position: {
  //   lat: 42.351902,
  //   lon: -71.070893
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70157'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70156'
  }]
}, {
  name: 'Copley',
  station: 'place-coecl',
  // position: {
  //   lat: 42.349974,
  //   lon: -71.077447
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70155'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70154'
  }]
}, {
  name: 'Hynes Convention Center',
  station: 'place-hymnl',
  // position: {
  //   lat: 42.347888,
  //   lon: -71.087903
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70153'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70152'
  }]
}, {
  name: 'Kenmore',
  station: 'place-kencl',
  // position: {
  //   lat: 42.348949,
  //   lon: -71.095169
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70151'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70150'
  }]
}, {
  name: 'Fenway',
  station: 'place-fenwy',
  // position: {
  //   lat: 42.345394,
  //   lon: -71.104187
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70187'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70186'
  }]
}, {
  name: 'Longwood',
  station: 'place-longw',
  // position: {
  //   lat: 42.341145,
  //   lon: -71.110451
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70183'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70182'
  }]
}, {
  name: 'Brookline Village',
  station: 'place-bvmnl',
  // position: {
  //   lat: 42.332774,
  //   lon: -71.116296
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70181'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70180'
  }]
}, {
  name: 'Brookline Hills',
  station: 'place-brkhl',
  // position: {
  //   lat: 42.331333,
  //   lon: -71.126999
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70179'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70178'
  }]
}, {
  name: 'Beaconsfield',
  station: 'place-bcnfd',
  // position: {
  //   lat: 42.335846,
  //   lon: -71.140823
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70177'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70176'
  }]
}, {
  name: 'Reservoir',
  station: 'place-rsmnl',
  // position: {
  //   lat: 42.335027,
  //   lon: -71.148952
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70175'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70174'
  }]
}, {
  name: 'Chestnut Hill',
  station: 'place-chhil',
  // position: {
  //   lat: 42.326653,
  //   lon: -71.165314
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70173'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70172'
  }]
}, {
  name: 'Newton Centre',
  station: 'place-newto',
  // position: {
  //   lat: 42.329391,
  //   lon: -71.192429
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70171'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70170'
  }]
}, {
  name: 'Newton Highlands',
  station: 'place-newtn',
  // position: {
  //   lat: 42.321735,
  //   lon: -71.206116
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70169'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70168'
  }]
}, {
  name: 'Eliot',
  station: 'place-eliot',
  // position: {
  //   lat: 42.319023,
  //   lon: -71.216713
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70167'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70166'
  }]
}, {
  name: 'Waban',
  station: 'place-waban',
  // position: {
  //   lat: 42.325943,
  //   lon: -71.230728
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70165'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70164'
  }]
}, {
  name: 'Woodland',
  station: 'place-woodl',
  // position: {
  //   lat: 42.333374,
  //   lon: -71.244301
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70163'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70162'
  }]
}, {
  name: 'Riverside',
  station: 'place-river',
  // position: {
  //   lat: 42.337059,
  //   lon: -71.251742
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70161'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70160'
  }]
}];

module.exports = {
  name: 'Green Line, D Branch',
  slug: 'green-d',
  routes: [ 'Green-D' ],
  stations: stations
};
