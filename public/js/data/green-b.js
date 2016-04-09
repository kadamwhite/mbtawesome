/*jshint -W106 */ // Disable underscore_case warnings
'use strict';

var stations = [{
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
    id: '70196'
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
  name: 'Blandford Street',
  station: 'place-bland',
  // position: {
  //   lat: 42.349293,
  //   lon: -71.100258
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70149'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70148'
  }]
}, {
  name: 'Boston Univ. East',
  station: 'place-buest',
  // position: {
  //   lat: 42.349735,
  //   lon: -71.103889
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70147'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70146'
  }]
}, {
  name: 'Boston Univ. Central',
  station: 'place-bucen',
  // position: {
  //   lat: 42.350082,
  //   lon: -71.106865
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70145'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70144'
  }]
}, {
  name: 'Boston Univ. West',
  station: 'place-buwst',
  // position: {
  //   lat: 42.350941,
  //   lon: -71.113876
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70143'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70142'
  }]
}, {
  name: 'Saint Paul Street',
  station: 'place-stplb',
  // position: {
  //   lat: 42.3512,
  //   lon: -71.116104
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70141'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70140'
  }]
}, {
  name: 'Pleasant Street',
  station: 'place-plsgr',
  // position: {
  //   lat: 42.351521,
  //   lon: -71.118889
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70139'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70138'
  }]
}, {
  name: 'Babcock Street',
  station: 'place-babck',
  // position: {
  //   lat: 42.35182,
  //   lon: -71.12165
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70137'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70136'
  }]
}, {
  name: 'Packards Corner',
  station: 'place-brico',
  // position: {
  //   lat: 42.351967,
  //   lon: -71.125031
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70135'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70134'
  }]
}, {
  name: 'Harvard Ave.',
  station: 'place-harvd',
  // position: {
  //   lat: 42.350243,
  //   lon: -71.131355
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70131'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70130'
  }]
}, {
  name: 'Griggs Street',
  station: 'place-grigg',
  // position: {
  //   lat: 42.348545,
  //   lon: -71.134949
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70129'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70128'
  }]
}, {
  name: 'Allston Street',
  station: 'place-alsgr',
  // position: {
  //   lat: 42.348701,
  //   lon: -71.137955
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70127'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70126'
  }]
}, {
  name: 'Warren Street',
  station: 'place-wrnst',
  // position: {
  //   lat: 42.348343,
  //   lon: -71.140457
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70125'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70124'
  }]
}, {
  name: 'Washington Street',
  station: 'place-wascm',
  // position: {
  //   lat: 42.343864,
  //   lon: -71.142853
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70121'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70120'
  }]
}, {
  name: 'Sutherland Road',
  station: 'place-sthld',
  // position: {
  //   lat: 42.341614,
  //   lon: -71.146202
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70117'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70116'
  }]
}, {
  name: 'Chiswick Road',
  station: 'place-chswk',
  // position: {
  //   lat: 42.340805,
  //   lon: -71.150711
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70115'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70114'
  }]
}, {
  name: 'Chestnut Hill Ave.',
  station: 'place-chill',
  // position: {
  //   lat: 42.338169,
  //   lon: -71.15316
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70113'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70112'
  }]
}, {
  name: 'South Street',
  station: 'place-sougr',
  // position: {
  //   lat: 42.3396,
  //   lon: -71.157661
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70111'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70110'
  }]
}, {
  name: 'Boston College',
  station: 'place-lake',
  // position: {
  //   lat: 42.340081,
  //   lon: -71.166769
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70107'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70106'
  }]
}];

module.exports = {
  name: 'Green Line, B Branch',
  slug: 'green-b',
  routes: [ 'Green-B' ],
  stations: stations
};
