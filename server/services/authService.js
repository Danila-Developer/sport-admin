const {UserModel} = require('../models/userModel')
const md5 = require('md5')
const bcrypt = require('bcrypt')
const TokenService = require('./tokenService')
const ApiError = require('../exeptions/apiError')


class AuthService {
   async registration(user){
      // user = {id, first_name,  last_name, email, is_admin, is_active, password}
      let {email, first_name, last_name, password} = user
      const candidate = await UserModel.findOne({where:{email}})
      if (candidate) {
         throw new Error(`Пользователь ${email} уже существует.`)
      }
      const dateNow = new Date()
      const id = md5(dateNow)
      
      password = await bcrypt.hash(password, 3)
      await UserModel.create({id, first_name, last_name, email, password, is_active: true, is_admin: false})
      const tokens = TokenService.generateToken({id, is_admin: false})
      await TokenService.saveRefreshToken(id, tokens.refreshToken)
      
      return {
         ...tokens,
         user: {
            first_name,
            last_name,
            email
         }
      }
   }

   async login(email, password){
      const user = await UserModel.findOne({where: {email}})
      if (!user){
         throw ApiError.BadRequest('Пользователь не найден')
      }
      const isPasswordEqual = await bcrypt.compare(password, user.password)
      if (!isPasswordEqual){
         throw ApiError.BadRequest('Некорректный пароль')
      }
      const tokens = TokenService.generateToken({id: user.id, is_admin: user.is_admin})
      await TokenService.saveRefreshToken(user.id, tokens.refreshToken)
      return {
         ...tokens,
         user: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
         }
      }
   }

   async logout(refreshToken){
      await TokenService.removeToken(refreshToken)
   }

   async getUserById(id) {
      const user = await UserModel.findOne({where: {id}, raw: true})
      return user
   }


}

module.exports = new AuthService()