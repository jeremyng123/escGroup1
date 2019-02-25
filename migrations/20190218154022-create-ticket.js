'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tickets', {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull:false,
        type: Sequelize.DATE
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
<<<<<<< HEAD:migrations/20190218154022-create-ticket.js
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      responses: {
        allowNull: true,
        type: Sequelize.STRING
      },
      topic: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status:{
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0   // 0 = Queued, 1 = in-progress, 2 = solved
=======
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING,
>>>>>>> origin/v1.1:migrations/20190218154022-create-ticket.js
      }
    }); 
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tickets');
  }
};
