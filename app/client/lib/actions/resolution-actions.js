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
  var self = this;
  var mock = _.clone(mockResolution);

  mock.id = id++;
  mock.description = description;

  self.dispatch(constants.CREATE_RESOLUTION, mock);

  setTimeout(function() {
    self.dispatch(constants.CREATE_RESOLUTION_SUCCESS, mock);
  }, 500);
};

resolutionActions.remove = function(uid) {
  var self = this;
  
  self.dispatch(constants.REMOVE_RESOLUTION, uid);

  setTimeout(function() {
    self.dispatch(constants.REMOVE_RESOLUTION_SUCCESS, uid);
  }, 500);
};

resolutionActions.load = function() {
  console.log('loading....')

  var self = this;

  // wtf.
  setTimeout(function() {
    self.dispatch(constants.LOAD_RESOLUTIONS);
  }, 0);

  setTimeout(function() {
    var mockResolution2 = _.clone(mockResolution);
    mockResolution2.id = 2;

    var mockResolution3 = _.clone(mockResolution);
    mockResolution3.id = 3;

    self.dispatch(constants.LOAD_RESOLUTIONS_SUCCESS, [mockResolution, mockResolution2, mockResolution3]);
  }, 500);

  // get('token').then(function(token) {
  //   return  axios({
  //     method: 'get',
  //     url: 'http://chosa-api.herokuapp.com/resolutions/all',
  //     headers: { 'Authorization': 'Bearer ' + token }
  //   });
  // }).then(function(resolutions) {
  //   self.dispatch(constants.LOAD_QUESTS_SUCCESS, resolutions.data);
  // }).catch(function(err) {
  //   console.log('err',err);
  //   self.dispatch(constants.LOAD_QUESTS_FAIL, err);
  // });

  if (firstLoad) {
    firstLoad = false;
    return;
  }
};

module.exports = resolutionActions;