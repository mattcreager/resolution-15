'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var api = new express.Router();  

var db = require('./models');

module.exports = function() {
  api.use(bodyParser.json());
  api.use(bodyParser.urlencoded({ extended: true })); 

  api.get('/resolutions', function(req, res) {
    db.Resolution.all().then(function(resolutions) {
      res.json(_.map(resolutions, function(resolution) {
        return resolution.toJSON();
      }));
    });
  });

  api.get('/resolutions/:id', function(req, res) {
    res.sendStatus(200);
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
        res.sendStatus(200);
      });
  });

  api.delete('/resolutions/:id', function(req, res) {
    db.Resolution
      .find(req.params.id)
      .then(function(resolution) {
        if (!resolution) {
          res.sendStatus(200);
          return;
        }

        resolution.destroy();
        res.sendStatus(200);
      });
  });

  return api;
};

