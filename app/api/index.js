'use strict';

var express = require('express');
var api = new express.Router();  

module.exports = function(config) {

  api.get('/resolution', function (req, res) {  
    res.send([{ something: 'awesome' }]);
  });

  return api;
};