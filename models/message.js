'use strict';
module.exports = (sequelize, DataTypes) => {
  var message = sequelize.define('message', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  message.associate = function(model) {
    message.belongsTo(model.user, {foreignKey: 'fk_userId', targetKey: 'userId' }); 
    message.belongsTo(model.ticket, {foreignKey: 'fk_ticketId', targetKey: 'ticketId' }); 
  };
  return message;
};