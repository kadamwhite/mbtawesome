/*jshint -W106 */ // Disable underscore_case warnings
'use strict';

var stations = [{
  name: 'Lechmere',
  station: 'place-lech',
  // position: {
  //   lat: 42.370772,
  //   lon: -71.076536
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70210'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70209'
  }]
}, {
  name: 'Science Park',
  station: 'place-spmnl',
  // position: {
  //   lat: 42.366664,
  //   lon: -71.067666
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70208'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70207'
  }]
}, {
  name: 'North Station',
  station: 'place-north',
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
  // position: {
  //   lat: 42.35639457,
  //   lon: -71.0624242
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70199'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70200'
  }]
}, {
  name: 'Boylston',
  station: 'place-boyls',
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
  name: 'Prudential',
  station: 'place-prmnl',
  // position: {
  //   lat: 42.34557,
  //   lon: -71.081696
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70239'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70240'
  }]
}, {
  name: 'Symphony',
  station: 'place-symcl',
  // position: {
  //   lat: 42.342687,
  //   lon: -71.085056
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70241'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70242'
  }]
}, {
  name: 'Northeastern University',
  station: 'place-nuniv',
  // position: {
  //   lat: 42.340401,
  //   lon: -71.088806
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70243'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70244'
  }]
}, {
  name: 'Museum of Fine Arts',
  station: 'place-mfa',
  // position: {
  //   lat: 42.337711,
  //   lon: -71.095512
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70245'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70246'
  }]
}, {
  name: 'Longwood Medical Area',
  station: 'place-lngmd',
  // position: {
  //   lat: 42.33596,
  //   lon: -71.100052
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70247'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70248'
  }]
}, {
  name: 'Brigham Circle',
  station: 'place-brmnl',
  // position: {
  //   lat: 42.334229,
  //   lon: -71.104609
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70249'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70250'
  }]
}, {
  name: 'Fenwood Road',
  station: 'place-fenwd',
  // position: {
  //   lat: 42.333706,
  //   lon: -71.105728
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70251'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70252'
  }]
}, {
  name: 'Mission Park',
  station: 'place-mispk',
  // position: {
  //   lat: 42.333195,
  //   lon: -71.109756
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70253'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70254'
  }]
}, {
  name: 'Riverway',
  station: 'place-rvrwy',
  // position: {
  //   lat: 42.331684,
  //   lon: -71.111931
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70255'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70256'
  }]
}, {
  name: 'Back of the Hill',
  station: 'place-bckhl',
  // position: {
  //   lat: 42.330139,
  //   lon: -71.111313
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70257'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70258'
  }]
}, {
  name: 'Heath Street',
  station: 'place-hsmnl',
  // position: {
  //   lat: 42.328681,
  //   lon: -71.110559
  // },
  stops: [{
    dir: 0,
    dirName: 'Westbound',
    id: '70260'
  }, {
    dir: 1,
    dirName: 'Eastbound',
    id: '70260'
  }]
}];

module.exports = {
  name: 'Green Line, E Branch',
  slug: 'green-e',
  routes: [ 'Green-E' ],
  stations: stations
};
