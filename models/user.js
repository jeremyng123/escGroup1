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
    },
    phoneNumber:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
    // user.hasMany(models.ticket, {
    //   foreignKey: 'userId',
    //   as: 'tickets'
    // });
  };
  return user;
};
