/* @jsx React.DOM */

'use strict';

var Fluxxor = require('fluxxor');
var React = require('react');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ResolutionComposer = {};

ResolutionComposer.mixins = [
  FluxMixin,
  StoreWatchMixin('ResolutionStore')
];

ResolutionComposer.getStateFromFlux = function() {
  return this.getFlux().store('ResolutionStore');
};

ResolutionComposer.getInitialState = function() {
  return { description: '' };
};

ResolutionComposer.handleChange = function(event) {
  this.setState({ description: event.target.value });
};

ResolutionComposer.handleClick = function() {
  if (!this.state.description) return;

  this.getFlux().actions.resolutions.create(this.state.description);
};

ResolutionComposer.render = function() {
  return (
    <div className="input-add input-group">
      <input type="text" className="form-control" placeholder="Your resolution (e.g. Find extra-terrestrial life, hold a seance)" value={this.state.description} onChange={this.handleChange} />
      <span className="input-group-btn add">
        <button className="btn btn-info" type="button" onClick={this.handleClick}><span className="glyphicon glyphicon-plus"></span></button>
      </span>
    </div>
  );
};

module.exports = React.createClass(ResolutionComposer);