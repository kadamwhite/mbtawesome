'use strict';

function pageView() {
  // Debounce an analytics hit if analytics is set up
  setTimeout(function() {
    if ( window.ga && typeof window.ga === 'function' ) {
      window.ga( 'send', 'pageview' );
    }
  }, 10 );
}

module.exports = {
  pageView: pageView
};
