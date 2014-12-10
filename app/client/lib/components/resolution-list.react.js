/* @jsx React.DOM */

'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var _ = require('lodash');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ResolutionComposer = require('./resolution-composer.react');
var ResolutionItem = require('./resolution-item.react');

var ResolutionList = {};

ResolutionList.mixins = [
  FluxMixin,
  StoreWatchMixin('ResolutionStore')
];

ResolutionList.getStateFromFlux = function() {
  return this.getFlux().store('ResolutionStore');
};

ResolutionList.componentDidMount = function () {
  //  if (this.props.token) {
  this.getFlux().actions.resolutions.load();
  // }
}

ResolutionList.render = function() {
  var resolutions = _.map(this.state.resolutions, function(resolution) {
    return (
      <ResolutionItem
        key={resolution.id} 
        uid={resolution.id}
        description={resolution.description}
        status={resolution.status}
      />
    );
  })
  return (
    <section>
      <ResolutionComposer />
      <br />
      {resolutions}
    </section>
  );
};

module.exports = React.createClass(ResolutionList);