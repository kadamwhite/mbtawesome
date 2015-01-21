// Update with your config settings.

var config = require( './services/configuration' );

// db.mode should match the name of one of the db.environments.
// 'development' or 'production' are the provided defaults; fill in the
// environment configuration accordingly.
module.exports = config.db.environments;
