const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const UserModel = sequelize.define('user', {
   id: {type: DataTypes.STRING, primaryKey: true},
   first_name: {type: DataTypes.STRING},
   last_name: {type: DataTypes.STRING},
   email: {type: DataTypes.STRING},
   password: {type: DataTypes.STRING},
   is_admin: {type: DataTypes.BOOLEAN},
   is_active: {type: DataTypes.BOOLEAN}
})

const UserTokenModel = sequelize.define('user_token', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   refresh_token: {type: DataTypes.STRING}
})

UserModel.hasMany(UserTokenModel)
UserTokenModel.belongsTo(UserModel)


module.exports = {
   UserModel,
   UserTokenModel
}