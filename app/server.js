'use strict';

var logger = require('logfmt');
var express = require('express')  

var config = require('./config');
var api = require('./api');

logger.log({ type: 'info', msg: 'server started, listening on port: ' + config.server.port });

var app = express();

console.log(__dirname + '/public');

// Mount Client & API specific routes
app.use('/', express.static(__dirname + '/client/public'));
app.use('/api', api(config));

app.listen(config.server.port);