'use strict';

module.exports = (sequelize, DataTypes) => {
  var ticket = sequelize.define('ticket', {
    ticketId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true    // PrimaryKey meant that it must have a unique value
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    responses: {
      allowNull: true,
      type: DataTypes.STRING(4000),
      defaultValue: "Awaiting admin's response..."
    },
    topic: {
      allowNull: false,
      type: DataTypes.STRING
    },
    tag:{
      type: DataTypes.INTEGER,
      defaultValue: 0   // 0 = Queued, 1 = in-progress, 2 = solved
    }
    
  });
  ticket.associate = function(model) {
    ticket.belongsTo(model.user, {foreignKey: 'fk_userId', targetKey: 'userId'}); // Adds fk_userId to ticket
  }
  return ticket;
};