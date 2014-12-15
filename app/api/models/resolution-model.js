'use strict';

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Resolution', {
	  description: DataTypes.TEXT,
	  status: DataTypes.INTEGER,
	  complete: {
	    type: DataTypes.BOOLEAN,
	    defaultValue: false,
	    allowNull: false
	  }
	});
};