/*jshint -W106 */// Disable underscore_case warnings
'use strict';

var stations = [{
  name: 'Alewife',
  station: 'place-alfcl',
  // position: {
  //   lat: 42.3954,
  //   lon: -71.1425
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70061'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70061'
  }]
}, {
  name: 'Davis',
  station: 'place-davis',
  // position: {
  //   lat: 42.3967,
  //   lon: -71.1218
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70063'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70064'
  }]
}, {
  name: 'Porter',
  station: 'place-portr',
  // position: {
  //   lat: 42.3884,
  //   lon: -71.1191
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70065'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70066'
  }]
}, {
  name: 'Harvard',
  station: 'place-harsq',
  // position: {
  //   lat: 42.3734,
  //   lon: -71.119
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70067'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70068'
  }]
}, {
  name: 'Central',
  station: 'place-cntsq',
  // position: {
  //   lat: 42.3655,
  //   lon: -71.1038
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70069'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70070'
  }]
}, {
  name: 'Kendall/MIT',
  station: 'place-knncl',
  // position: {
  //   lat: 42.3625,
  //   lon: -71.0862
  // },
  stops: [{
    dir: 1,
    dirName: 'Northbound',
    id: '70072'
  }, {
    dir: 0,
    dirName: 'Southbound',
    id: '70071'
  }]
}, {
  name: 'Charles/MGH',
  station: 'place-chmnl',
  // position: {
  //   lat: 42.3612,
  //   lon: -71.0706
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70073'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70074'
  }]
}, {
  name: 'Park Street',
  station: 'place-pktrm',
  // position: {
  //   lat: 42.3564,
  //   lon: -71.0624
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70075'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70076'
  }]
}, {
  name: 'Downtown Crossing',
  station: 'place-dwnxg',
  // position: {
  //   lat: 42.3555,
  //   lon: -71.0602
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70077'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70078'
  }]
}, {
  name: 'South Station',
  station: 'place-sstat',
  // position: {
  //   lat: 42.3523,
  //   lon: -71.0552
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70079'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70080'
  }]
}, {
  name: 'Broadway',
  station: 'place-brdwy',
  // position: {
  //   lat: 42.3426,
  //   lon: -71.057
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70081'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70082'
  }]
}, {
  name: 'Andrew',
  station: 'place-andrw',
  // position: {
  //   lat: 42.3302,
  //   lon: -71.0577
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70083'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70084'
  }]
}, {
  name: 'JFK/Umass',
  station: 'place-jfk',
  // position: {
  //   lat: 42.3207,
  //   lon: -71.0524
  // },
  stops: [{
    dir: 0,
    dirName: 'Southbound',
    id: '70095'
  }, {
    dir: 1,
    dirName: 'Northbound',
    id: '70096'
  }]
},
[
  [{
    name: 'Savin Hill',
    station: 'place-shmnl',
    // position: {
    //   lat: 42.3113,
    //   lon: -71.0533
    // },
    stops: [{
      dir: 1,
      dirName: 'Northbound',
      id: '70088'
    }, {
      dir: 0,
      dirName: 'Southbound',
      id: '70087'
    }]
  }, {
    name: 'Fields Corner',
    station: 'place-fldcr',
    // position: {
    //   lat: 42.3001,
    //   lon: -71.0617
    // },
    stops: [{
      dir: 0,
      dirName: 'Southbound',
      id: '70089'
    }, {
      dir: 1,
      dirName: 'Northbound',
      id: '70090'
    }]
  }, {
    name: 'Shawmut',
    station: 'place-smmnl',
    // position: {
    //   lat: 42.2931,
    //   lon: -71.0657
    // },
    stops: [{
      dir: 0,
      dirName: 'Southbound',
      id: '70091'
    }, {
      dir: 1,
      dirName: 'Northbound',
      id: '70092'
    }]
  }, {
    name: 'Ashmont',
    station: 'place-asmnl',
    // position: {
    //   lat: 42.2847,
    //   lon: -71.0645
    // },
    stops: [{
      dir: 0,
      dirName: 'Southbound',
      id: '70093'
    }, {
      dir: 1,
      dirName: 'Northbound',
      id: '70094'
    }]
  }],
  [{
    name: 'North Quincy',
    station: 'place-nqncy',
    // position: {
    //   lat: 42.2753,
    //   lon: -71.0296
    // },
    stops: [{
      dir: 0,
      dirName: 'Southbound',
      id: '70097'
    }, {
      dir: 1,
      dirName: 'Northbound',
      id: '70098'
    }]
  }, {
    name: 'Wollaston',
    station: 'place-wlsta',
    // position: {
    //   lat: 42.2665,
    //   lon: -71.0203
    // },
    stops: [{
      dir: 0,
      dirName: 'Southbound',
      id: '70099'
    }, {
      dir: 1,
      dirName: 'Northbound',
      id: '70100'
    }]
  }, {
    name: 'Quincy Center',
    station: 'place-qnctr',
    // position: {
    //   lat: 42.2518,
    //   lon: -71.0054
    // },
    stops: [{
      dir: 0,
      dirName: 'Southbound',
      id: '70101'
    }, {
      dir: 1,
      dirName: 'Northbound',
      id: '70102'
    }]
  }, {
    name: 'Quincy Adams',
    station: 'place-qamnl',
    // position: {
    //   lat: 42.2334,
    //   lon: -71.0072
    // },
    stops: [{
      dir: 0,
      dirName: 'Southbound',
      id: '70103'
    }, {
      dir: 1,
      dirName: 'Northbound',
      id: '70104'
    }]
  }, {
    name: 'Braintree',
    station: 'place-brntn',
    // position: {
    //   lat: 42.2079,
    //   lon: -71.0011
    // },
    stops: [{
      dir: 0,
      dirName: 'Southbound',
      id: '70105'
    }, {
      dir: 1,
      dirName: 'Northbound',
      id: '70105'
    }]
  }]
]];

module.exports = {
  name: 'Red Line',
  slug: 'red',
  routes: [ '931_', '933_' ],
  stops: stations
};
