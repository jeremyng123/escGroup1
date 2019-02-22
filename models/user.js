const bcrypt = require('bcrypt');

/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
//   },
//     {
//         freezeTableName: true,
//         instanceMethods: {
//             generateHash(password){
//                 return bcrypt.hash(password, bcrypt.genSaltSync(8));
//             },
//             validPassword(password){
//                 return bcrypt.compare(password, this.password);
//             }
//         }
//     }
    
  });
  user.associate = function(models) {
    // associations can be defined here
    // do nothing for now
  };
  return user;
