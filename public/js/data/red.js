/*jshint -W106 */// Disable underscore_case warnings
'use strict';

var stations = [{
  name: 'Alewife',
  station: 'place-alfcl',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70061'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70061'
  }],
  position: {
    lat: 42.3954,
    lon: -71.1425
  }
}, {
  name: 'Davis',
  station: 'place-davis',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70063'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70064'
  }],
  position: {
    lat: 42.3967,
    lon: -71.1218
  }
}, {
  name: 'Porter',
  station: 'place-portr',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70065'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70066'
  }],
  position: {
    lat: 42.3884,
    lon: -71.1191
  }
}, {
  name: 'Harvard',
  station: 'place-harsq',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70067'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70068'
  }],
  position: {
    lat: 42.3734,
    lon: -71.119
  }
}, {
  name: 'Central',
  station: 'place-cntsq',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70069'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70070'
  }],
  position: {
    lat: 42.3655,
    lon: -71.1038
  }
}, {
  name: 'Kendall/MIT',
  station: 'place-knncl',
  stops: [{
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70072'
  }, {
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70071'
  }],
  position: {
    lat: 42.3625,
    lon: -71.0862
  }
}, {
  name: 'Charles/MGH',
  station: 'place-chmnl',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70073'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70074'
  }],
  position: {
    lat: 42.3612,
    lon: -71.0706
  }
}, {
  name: 'Park Street',
  station: 'place-pktrm',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70075'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70076'
  }],
  position: {
    lat: 42.3564,
    lon: -71.0624
  }
}, {
  name: 'Downtown Crossing',
  station: 'place-dwnxg',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70077'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70078'
  }],
  position: {
    lat: 42.3555,
    lon: -71.0602
  }
}, {
  name: 'South Station',
  station: 'place-sstat',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70079'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70080'
  }],
  position: {
    lat: 42.3523,
    lon: -71.0552
  }
}, {
  name: 'Broadway',
  station: 'place-brdwy',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70081'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70082'
  }],
  position: {
    lat: 42.3426,
    lon: -71.057
  }
}, {
  name: 'Andrew',
  station: 'place-andrw',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70083'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70084'
  }],
  position: {
    lat: 42.3302,
    lon: -71.0577
  }
}, {
  name: 'JFK/Umass',
  station: 'place-jfk',
  stops: [{
    direction_id: 0,
    direction_name: 'Southbound',
    stop_id: '70095'
  }, {
    direction_id: 1,
    direction_name: 'Northbound',
    stop_id: '70096'
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
      direction_id: 1,
      direction_name: 'Northbound',
      stop_id: '70088'
    }, {
      direction_id: 0,
      direction_name: 'Southbound',
      stop_id: '70087'
    }],
    position: {
      lat: 42.3113,
      lon: -71.0533
    }
  }, {
    name: 'Fields Corner',
    station: 'place-fldcr',
    stops: [{
      direction_id: 0,
      direction_name: 'Southbound',
      stop_id: '70089'
    }, {
      direction_id: 1,
      direction_name: 'Northbound',
      stop_id: '70090'
    }],
    position: {
      lat: 42.3001,
      lon: -71.0617
    }
  }, {
    name: 'Shawmut',
    station: 'place-smmnl',
    stops: [{
      direction_id: 0,
      direction_name: 'Southbound',
      stop_id: '70091'
    }, {
      direction_id: 1,
      direction_name: 'Northbound',
      stop_id: '70092'
    }],
    position: {
      lat: 42.2931,
      lon: -71.0657
    }
  }, {
    name: 'Ashmont',
    station: 'place-asmnl',
    stops: [{
      direction_id: 0,
      direction_name: 'Southbound',
      stop_id: '70093'
    }, {
      direction_id: 1,
      direction_name: 'Northbound',
      stop_id: '70094'
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
      direction_id: 0,
      direction_name: 'Southbound',
      stop_id: '70097'
    }, {
      direction_id: 1,
      direction_name: 'Northbound',
      stop_id: '70098'
    }],
    position: {
      lat: 42.2753,
      lon: -71.0296
    }
  }, {
    name: 'Wollaston',
    station: 'place-wlsta',
    stops: [{
      direction_id: 0,
      direction_name: 'Southbound',
      stop_id: '70099'
    }, {
      direction_id: 1,
      direction_name: 'Northbound',
      stop_id: '70100'
    }],
    position: {
      lat: 42.2665,
      lon: -71.0203
    }
  }, {
    name: 'Quincy Center',
    station: 'place-qnctr',
    stops: [{
      direction_id: 0,
      direction_name: 'Southbound',
      stop_id: '70101'
    }, {
      direction_id: 1,
      direction_name: 'Northbound',
      stop_id: '70102'
    }],
    position: {
      lat: 42.2518,
      lon: -71.0054
    }
  }, {
    name: 'Quincy Adams',
    station: 'place-qamnl',
    stops: [{
      direction_id: 0,
      direction_name: 'Southbound',
      stop_id: '70103'
    }, {
      direction_id: 1,
      direction_name: 'Northbound',
      stop_id: '70104'
    }],
    position: {
      lat: 42.2334,
      lon: -71.0072
    }
  }, {
    name: 'Braintree',
    station: 'place-brntn',
    stops: [{
      direction_id: 0,
      direction_name: 'Southbound',
      stop_id: '70105'
    }, {
      direction_id: 1,
      direction_name: 'Northbound',
      stop_id: '70105'
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
