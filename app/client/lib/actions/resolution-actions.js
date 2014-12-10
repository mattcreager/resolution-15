'use strict';

var Promise = require('bluebird');
var _ = require('lodash');
//var localstorage = require('localstorage-down');
//var levelup = require('levelup');
var axios = require('axios');

//var db = levelup('/player', { db: localstorage });
//var get = Promise.promisify(db.get, db);
//var del = Promise.promisify(db.del, db);

var constants = require('../constants/resolution-constants');

var resolutionActions = {};

var firstLoad = true;

var mockResolution = {
  id: 1,
  description: 'A sweet thing I will',
  complete: false,
  status: 'Whatever'
};

var id = 5;

resolutionActions.create = function(description) {
  var dispatch = this.dispatch.bind(this);

  dispatch(constants.CREATE_RESOLUTION, {
    id: id++,
    description: description,
    complete: false,
    status: 'Whatever'
  });

  axios.post('api/resolutions', { description: description })
    .then(function(result) { 
      console.log('this is the create result:', result);
      dispatch(constants.CREATE_RESOLUTION_SUCCESS, result);
    }).catch(function(err) {
      dispatch(constants.CREATE_RESOLUTION_FAIL, err);
    });
};

resolutionActions.remove = function(uid) {
  var self = this;
  
  self.dispatch(constants.REMOVE_RESOLUTION, uid);

  setTimeout(function() {
    self.dispatch(constants.REMOVE_RESOLUTION_SUCCESS, uid);
  }, 500);
};

resolutionActions.load = function() {
  var dispatch = this.dispatch.bind(this);

  dispatch(constants.LOAD_RESOLUTIONS);

  axios.get('api/resolutions')
    .then(function(resolutions) {
      dispatch(constants.LOAD_RESOLUTIONS_SUCCESS, resolutions.data);
    }).catch(function(err) {
      dispatch(constants.LOAD_RESOLUTIONS_FAIL, err);
    });

  if (firstLoad) {
    firstLoad = false;
    return;
  }
};

module.exports = resolutionActions;