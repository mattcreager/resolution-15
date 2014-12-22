/* @jsx React.DOM */

'use strict';

var Fluxxor = require('fluxxor');
var React = require('react/addons');

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
  var cx = React.addons.classSet;
  var classes = cx({
    'input-group': true,
    'resolution-item': true,
    'resolution-item-checked': this.props.complete
  });

  return (
    <div className={classes}>
      <span className="input-group-addon checkbox">
        <input
          type="checkbox"
          id={this.props.uid}
          checked={this.props.complete ? 'checked' : false}
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