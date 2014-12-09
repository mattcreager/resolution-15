'use strict';

var logger = require('logfmt');
var http = require('http');
var express = require('express');
var client = new express.Router();  

var config = require('./config');
var api = require('./api');

logger.log({ type: 'info', msg: 'server started, listening on port: ' + config.port });

var app = express();

console.log(__dirname + '/public');

// Mount Client & API specific routes
app.use('/', express.static(__dirname + '/client/public'));
app.use('/api', api(config));


app.listen(config.port);