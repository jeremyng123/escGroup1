'use strict';
module.exports = (sequelize, DataTypes) => {
  var lead = sequelize.define('lead', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true    // PrimaryKey meant that it must have a unique value
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  lead.associate = function(models) {
    // associations can be defined here
    // do nothing for now
  };
  return lead;
};