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
  name: 'Government Center',
  station: 'place-gover',
  transfer: [ 'blue' ],
  // position: {
  //   lat: 42.359705,
  //   lon: -71.059215
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70202'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70201'
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
    id: '70197'
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
  name: 'Saint Mary Street',
  station: 'place-smary',
  // position: {
  //   lat: 42.345974,
  //   lon: -71.107353
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70211'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70212'
  }]
}, {
  name: 'Hawes Street',
  station: 'place-hwsst',
  // position: {
  //   lat: 42.344906,
  //   lon: -71.111145
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70213'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70214'
  }]
}, {
  name: 'Kent Street',
  station: 'place-kntst',
  // position: {
  //   lat: 42.344074,
  //   lon: -71.114197
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70215'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70216'
  }]
}, {
  name: 'Saint Paul Street',
  station: 'place-stpul',
  // position: {
  //   lat: 42.343327,
  //   lon: -71.116997
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70217'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70218'
  }]
}, {
  name: 'Coolidge Corner',
  station: 'place-cool',
  // position: {
  //   lat: 42.342213,
  //   lon: -71.121201
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70219'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70220'
  }]
}, {
  name: 'Summit Ave.',
  station: 'place-sumav',
  // position: {
  //   lat: 42.34111,
  //   lon: -71.12561
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70223'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70224'
  }]
}, {
  name: 'Brandon Hall',
  station: 'place-bndhl',
  // position: {
  //   lat: 42.340023,
  //   lon: -71.129082
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70225'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70226'
  }]
}, {
  name: 'Fairbanks Street',
  station: 'place-fbkst',
  // position: {
  //   lat: 42.339725,
  //   lon: -71.131073
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70227'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70228'
  }]
}, {
  name: 'Washington Square',
  station: 'place-bcnwa',
  // position: {
  //   lat: 42.339394,
  //   lon: -71.13533
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70229'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70230'
  }]
}, {
  name: 'Tappan Street',
  station: 'place-tapst',
  // position: {
  //   lat: 42.338459,
  //   lon: -71.138702
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70231'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70232'
  }]
}, {
  name: 'Dean Road',
  station: 'place-denrd',
  // position: {
  //   lat: 42.337807,
  //   lon: -71.141853
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70233'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70234'
  }]
}, {
  name: 'Englewood Ave.',
  station: 'place-engav',
  // position: {
  //   lat: 42.336971,
  //   lon: -71.14566
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70235'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70236'
  }]
}, {
  name: 'Cleveland Circle',
  station: 'place-clmnl',
  // position: {
  //   lat: 42.336142,
  //   lon: -71.149326
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70237'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70238'
  }]
}];

module.exports = {
  name: 'Green Line, C Branch',
  slug: 'green-c',
  routes: [ 'Green-C' ],
  stations: stations
};
