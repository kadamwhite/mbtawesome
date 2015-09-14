'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var fileStreamRotator = require( 'file-stream-rotator' );

// Use Morgan logger for HTTP access logging
var morgan = require( 'morgan' );

var logDirPath = path.join( process.cwd(), 'logs' );

module.exports = {
  /**
   * Return a configured Morgan instance
   *
   * @param  {String}  mode      'dev' or 'combined', depending on environment
   * @param  {Boolean} logToFile Whether to log to files or just to stdout
   * @return A Morgan logger middleware instance
   */
  mode: function( mode, logToFile ) {
    var loggerOptions = {};

    // Log to rotating file if in prod mode
    if ( logToFile ) {
      // ensure log directory exists
      fs.existsSync( logDirPath ) || fs.mkdirSync( logDirPath );

      // create a file-rotating write stream
      loggerOptions.stream = fileStreamRotator.getStream({
        filename: logDirPath + '/access-%DATE%.log',
        date_format: "YYYY-MM-DD",
        frequency: 'daily',
        verbose: false
      });
    }

    // Return a configured morgan middleware instance
    return morgan( mode, loggerOptions );
  }
};
