/*jshint -W106 */// Disable underscore_case warnings
'use strict';

var stations = [{
  name: 'Alewife',
  station: 'place-alfcl',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70061'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70061'
  }],
  position: {
    lat: 42.3954,
    lon: -71.1425
  }
}, {
  name: 'Davis',
  station: 'place-davis',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70063'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70064'
  }],
  position: {
    lat: 42.3967,
    lon: -71.1218
  }
}, {
  name: 'Porter',
  station: 'place-portr',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70065'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70066'
  }],
  position: {
    lat: 42.3884,
    lon: -71.1191
  }
}, {
  name: 'Harvard',
  station: 'place-harsq',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70067'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70068'
  }],
  position: {
    lat: 42.3734,
    lon: -71.119
  }
}, {
  name: 'Central',
  station: 'place-cntsq',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70069'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70070'
  }],
  position: {
    lat: 42.3655,
    lon: -71.1038
  }
}, {
  name: 'Kendall/MIT',
  station: 'place-knncl',
  stops: [{
    direction: 1,
    dirName: 'Northbound',
    id: '70072'
  }, {
    direction: 0,
    dirName: 'Southbound',
    id: '70071'
  }],
  position: {
    lat: 42.3625,
    lon: -71.0862
  }
}, {
  name: 'Charles/MGH',
  station: 'place-chmnl',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70073'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70074'
  }],
  position: {
    lat: 42.3612,
    lon: -71.0706
  }
}, {
  name: 'Park Street',
  station: 'place-pktrm',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70075'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70076'
  }],
  position: {
    lat: 42.3564,
    lon: -71.0624
  }
}, {
  name: 'Downtown Crossing',
  station: 'place-dwnxg',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70077'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70078'
  }],
  position: {
    lat: 42.3555,
    lon: -71.0602
  }
}, {
  name: 'South Station',
  station: 'place-sstat',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70079'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70080'
  }],
  position: {
    lat: 42.3523,
    lon: -71.0552
  }
}, {
  name: 'Broadway',
  station: 'place-brdwy',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70081'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70082'
  }],
  position: {
    lat: 42.3426,
    lon: -71.057
  }
}, {
  name: 'Andrew',
  station: 'place-andrw',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70083'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70084'
  }],
  position: {
    lat: 42.3302,
    lon: -71.0577
  }
}, {
  name: 'JFK/Umass',
  station: 'place-jfk',
  stops: [{
    direction: 0,
    dirName: 'Southbound',
    id: '70095'
  }, {
    direction: 1,
    dirName: 'Northbound',
    id: '70096'
  }],
  position: {
    lat: 42.3207,
    lon: -71.0524
  }
},
[
  [{
    name: 'Savin Hill',
    station: 'place-shmnl',
    stops: [{
      direction: 1,
      dirName: 'Northbound',
      id: '70088'
    }, {
      direction: 0,
      dirName: 'Southbound',
      id: '70087'
    }],
    position: {
      lat: 42.3113,
      lon: -71.0533
    }
  }, {
    name: 'Fields Corner',
    station: 'place-fldcr',
    stops: [{
      direction: 0,
      dirName: 'Southbound',
      id: '70089'
    }, {
      direction: 1,
      dirName: 'Northbound',
      id: '70090'
    }],
    position: {
      lat: 42.3001,
      lon: -71.0617
    }
  }, {
    name: 'Shawmut',
    station: 'place-smmnl',
    stops: [{
      direction: 0,
      dirName: 'Southbound',
      id: '70091'
    }, {
      direction: 1,
      dirName: 'Northbound',
      id: '70092'
    }],
    position: {
      lat: 42.2931,
      lon: -71.0657
    }
  }, {
    name: 'Ashmont',
    station: 'place-asmnl',
    stops: [{
      direction: 0,
      dirName: 'Southbound',
      id: '70093'
    }, {
      direction: 1,
      dirName: 'Northbound',
      id: '70094'
    }],
    position: {
      lat: 42.2847,
      lon: -71.0645
    }
  }],
  [{
    name: 'North Quincy',
    station: 'place-nqncy',
    stops: [{
      direction: 0,
      dirName: 'Southbound',
      id: '70097'
    }, {
      direction: 1,
      dirName: 'Northbound',
      id: '70098'
    }],
    position: {
      lat: 42.2753,
      lon: -71.0296
    }
  }, {
    name: 'Wollaston',
    station: 'place-wlsta',
    stops: [{
      direction: 0,
      dirName: 'Southbound',
      id: '70099'
    }, {
      direction: 1,
      dirName: 'Northbound',
      id: '70100'
    }],
    position: {
      lat: 42.2665,
      lon: -71.0203
    }
  }, {
    name: 'Quincy Center',
    station: 'place-qnctr',
    stops: [{
      direction: 0,
      dirName: 'Southbound',
      id: '70101'
    }, {
      direction: 1,
      dirName: 'Northbound',
      id: '70102'
    }],
    position: {
      lat: 42.2518,
      lon: -71.0054
    }
  }, {
    name: 'Quincy Adams',
    station: 'place-qamnl',
    stops: [{
      direction: 0,
      dirName: 'Southbound',
      id: '70103'
    }, {
      direction: 1,
      dirName: 'Northbound',
      id: '70104'
    }],
    position: {
      lat: 42.2334,
      lon: -71.0072
    }
  }, {
    name: 'Braintree',
    station: 'place-brntn',
    stops: [{
      direction: 0,
      dirName: 'Southbound',
      id: '70105'
    }, {
      direction: 1,
      dirName: 'Northbound',
      id: '70105'
    }],
    position: {
      lat: 42.2079,
      lon: -71.0011
    }
  }]
]];

module.exports = {
  name: 'Red Line',
  slug: 'red',
  routes: [ '931_', '933_' ],
  stops: stations
};
