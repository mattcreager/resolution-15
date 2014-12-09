/* @jsx React.DOM */

'use strict';

window.jQuery = require('jquery');
var bootstrap = require('bootstrap');

var React = require('react');
var Fluxxor = require('fluxxor');

var ResolutionList = require('./components/resolution-list.react');
var ResolutionStore = require('./stores/resolution-store');
var resolutionActions = require('./actions/resolution-actions');

module.exports = App;

function App() {
  var actions = { resolutions: resolutionActions};
  var stores = { ResolutionStore: new ResolutionStore() };

  this.flux = new Fluxxor.Flux(stores, actions);
}

App.prototype.initialize = function() {
  var container = document.getElementById('app-container');

  React.initializeTouchEvents(true);
  React.render(<ResolutionList flux={this.flux} />, container);
};