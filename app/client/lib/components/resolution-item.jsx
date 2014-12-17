/* @jsx React.DOM */

'use strict';

var Fluxxor = require('fluxxor');
var React = require('react');

var ResolutionItem = {};

var FluxMixin = Fluxxor.FluxMixin(React);

ResolutionItem.mixins = [ FluxMixin ];

ResolutionItem.handleClick = function() {
  this.getFlux().actions.resolutions.remove(this.props.uid);
};

ResolutionItem.handleCheck = function() {
  var resolutionId = this.props.uid;

  this.getFlux().actions.resolutions.update({
    id: resolutionId,
    complete: !this.props.complete
  });
};

ResolutionItem.render = function() {
  var groupStyle = {  };

  return (
    <div className="resolution-item input-group" style={groupStyle}>
      <span className="input-group-addon checkbox">
        <input
          id={this.props.uid}
          type="checkbox"
          checked={this.props.complete}
          onChange={this.handleCheck}
        />
        <label htmlFor={this.props.uid}></label>
      </span>
      <input
        type="text"
        className="form-control"
        value={this.props.description}
        disabled
      />
      <span className="input-group-btn remove">
        <button className="btn btn-danger" type="button" onClick={this.handleClick}><span className="glyphicon glyphicon-remove"></span></button>
      </span>
    </div>
  );
};

module.exports = React.createClass(ResolutionItem);