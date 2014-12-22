'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var db = require('./models');

var api = new express.Router();  

var NOT_IMPLEMENTED = 501;
var CREATED = 201;
var NO_CONTENT = 204;
var NOT_FOUND = 404;

module.exports = function() {
  api.use(bodyParser.json());
  api.use(bodyParser.urlencoded({ extended: true })); 

  api.get('/resolutions', function(req, res) {
    db.Resolution
      .all({ order: 'id ASC' })
      .then(function(resolutions) {
        res.json(_.map(resolutions, function(resolution) {
          return resolution.toJSON();
        }));
      });
  });

  api.get('/resolutions/:id', function(req, res) {
    res.sendStatus(NOT_IMPLEMENTED);
  });

  api.post('/resolutions', function(req, res) {
    db.Resolution
      .create(req.body)
      .then(function(resolution) {
        res.json(resolution.toJSON());
      });
  });

  api.put('/resolutions/:id', function(req, res) {
    db.Resolution
      .find(req.params.id)
      .then(function(resolution) {
        return resolution.updateAttributes(req.body);
      })
      .then(function() {
        res.sendStatus(CREATED);
      });
  });

  api.delete('/resolutions/:id', function(req, res) {
    db.Resolution
      .find(req.params.id)
      .then(function(resolution) {
        if (!resolution) {
          res.sendStatus(NOT_FOUND);
          return;
        }

        resolution.destroy();
        res.sendStatus(NO_CONTENT);
      });
  });

  return api;
};

