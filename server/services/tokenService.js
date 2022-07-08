const jwt = require('jsonwebtoken')
const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = require('../../config')
const { UserTokenModel, UserModel } = require('../models/userModel')
const config = require('./../../config')

class TokenService {
   generateToken(payload) {
      const accessToken = jwt.sign(payload, JWT_ACCESS_KEY, { expiresIn: '24h' })
      const refreshToken = jwt.sign(payload, JWT_REFRESH_KEY, { expiresIn: '30d' })
      return {
         accessToken,
         refreshToken
      }
   }

   async saveRefreshToken(userId, refreshToken) {
      const tokenData = await UserTokenModel.findOne({ where: { userId } })
      if (tokenData) {
         const refresh_token = refreshToken
         return await UserTokenModel.update({ refresh_token }, { where: { userId } })
      }
      await UserTokenModel.create({ refresh_token: refreshToken, userId })
      return refreshToken
   }

   async removeToken(refreshToken) {
      await UserTokenModel.destroy({ where: { refresh_token: refreshToken } })
   }

   validateAccessToken(token) {
      try {
         const userData = jwt.verify(token, config.JWT_REFRESH_KEY)
         return userData
      } catch (e) {
         return null
      }

   }
}

module.exports = new TokenService()