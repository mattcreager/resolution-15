'use strict';

var Promise = require('bluebird');
var _ = require('lodash');
var axios = require('axios');

var constants = require('../constants/resolution-constants');

var resolutionActions = {};
var tempId = 0;

resolutionActions.create = function(description) {
  tempId++;

  var dispatch = this.dispatch.bind(this);

  dispatch(constants.CREATE_RESOLUTION, {
    tempId: tempId,
    description: description,
    complete: false,
  });

  axios
    .post('api/resolutions', { description: description })
    .then(function(result) {
      result.data.tempId = tempId;
      dispatch(constants.CREATE_RESOLUTION_SUCCESS, result.data);
    }).catch(function(err) {
      dispatch(constants.CREATE_RESOLUTION_FAIL, err);
    });
};

resolutionActions.remove = function(uid) {
  var dispatch = this.dispatch.bind(this);
  
  dispatch(constants.REMOVE_RESOLUTION, uid);

  axios
    .delete('api/resolutions/' + uid)
    .then(function(result) {
      dispatch(constants.REMOVE_RESOLUTION_SUCCESS, uid);
    });
};

resolutionActions.load = function() {
  var dispatch = this.dispatch.bind(this);

  dispatch(constants.LOAD_RESOLUTIONS);

  axios
    .get('api/resolutions')
    .then(function(resolutions) {
      dispatch(constants.LOAD_RESOLUTIONS_SUCCESS, resolutions.data);
    }).catch(function(err) {
      dispatch(constants.LOAD_RESOLUTIONS_FAIL, err);
    });
};

module.exports = resolutionActions;