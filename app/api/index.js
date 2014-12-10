'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var api = new express.Router();  

module.exports = function(config) {

  var mockResolution = {
    id: 1,
    description: 'A sweet thing I will',
    complete: false,
    status: 'Whatever'
  };

  var mockResolution2 = {
    id: 2,
    description: 'A sweet thing I will',
    complete: false,
    status: 'Whatever'
  };

  var mockResolution3 = {
    id: 3,
    description: 'A sweet thing I will',
    complete: false,
    status: 'Whatever'
  };

  var resolutions = [ mockResolution, mockResolution2, mockResolution3 ];

  api.use(bodyParser.json());
  api.use(bodyParser.urlencoded({ extended: true })); 

  api.get('/resolutions', function(req, res) {  
    res.json(resolutions);
  });

  api.get('/resolutions/:id', function(req, res) {
    res.json(mockResolution)
  });

  api.post('/resolutions', function(req, res) {
    console.log(req.body)

    res.sendStatus(200);
  });

  api.put('/resolutions/:id', function(req, res) {
    res.sendStatus(200);
  });

  api.delete('/resolutions/:id', function(req, res) {
    res.sendStatus(200);
  });

  return api;
};

