"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Resolutions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
      description: DataTypes.STRING,
      status: DataTypes.INTEGER,
      complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Resolutions').complete(done);
  }
};
