'use strict';

var Fluxxor = require('fluxxor');
var constants = require('../constants/resolution-constants.js');
var _ = require('lodash');

var ResolutionStore = {};

ResolutionStore.initialize = function() {
  this.loading = false;
  this.adding = false;
  this.error = null;
  this.resolutions = [];
  this.loadingQuests = {};

  this.bindActions(
    constants.LOAD_RESOLUTIONS, this.onLoad,
    constants.LOAD_RESOLUTIONS_SUCCESS, this.onLoadSuccess,
    constants.LOAD_RESOLUTIONS_FAIL, this.onLoadFail,
    constants.CREATE_RESOLUTION, this.onNewResolution,
    constants.REMOVE_RESOLUTION, this.onRemoveResolution
  ); 
};

ResolutionStore.onRemoveResolution = function(uid) {
  this.resolutions = _.reject(this.resolutions, {id: uid});

  this.emit(constants.CHANGE_EVENT);
}

ResolutionStore.onLoad = function() {
  this.loading = true;
  this.resolutions = [];
  this.error = null;

  this.emit(constants.CHANGE_EVENT);
};

ResolutionStore.onNewResolution = function(payload) {
  _(this.resolutions).push(payload);

  this.emit(constants.CHANGE_EVENT);
};

ResolutionStore.onLoadSuccess = function(payload) {
  console.log('we have a payload', payload);
  this.resolutions = payload;
  this.emit(constants.CHANGE_EVENT);
};

ResolutionStore.onLoadFail = function() {
  this.emit(constants.CHANGE_EVENT);
};

ResolutionStore.getState = function() {
  return { resolutions: this.resolutions };
};

module.exports = Fluxxor.createStore(ResolutionStore);