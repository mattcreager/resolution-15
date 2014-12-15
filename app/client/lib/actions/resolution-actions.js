'use strict';

var axios = require('axios');
var _ = require('lodash');

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
  var dispatch = _.bind(this.dispatch, this);
  
  dispatch(constants.REMOVE_RESOLUTION, uid);

  axios
    .delete('api/resolutions/' + uid)
    .then(function() {
      dispatch(constants.REMOVE_RESOLUTION_SUCCESS, uid);
    });
};

resolutionActions.update = function(resolution) {
  var dispatch = this.dispatch.bind(this);

  dispatch(constants.UPDATE_RESOLUTION, resolution);

  axios
    .put('api/resolutions/' + resolution.id, resolution)
    .then(function() {
      dispatch(constants.UPDATE_RESOLUTION_SUCCESS, resolution);
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