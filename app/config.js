'use strict'

var util = require('./util');

module.exports = {
  env     : process.env.NODE_ENV,
  url     : 'aPollApp.herokuapp.com',
  secret  : process.env.SESSION_SECRET || 'myPrecious',
  verbose : util.bool(process.env.VERBOSE) || false,
  cache   : util.bool(process.env.VIEW_CACHE) || true,
  server : {
    host : '0.0.0.0',
    port : util.int(process.env.PORT) || 5000
  },
  database: {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    charset  : 'utf8'
  }
};
