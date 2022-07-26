const AuthService = require('../services/authService')
const apiError = require('../exeptions/apiError')
const { validationResult } = require('express-validator')



class AuthController {
   async registration(req, res, next) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return next(apiError.BadRequest('Ошибка при валидации', errors.array()))
            
         }

         const { first_name, last_name, email, password } = req.body
         const userData = await AuthService.registration({ first_name, last_name, email, password })

         res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
         res.json(userData)
      } catch (e) {
         next(apiError.BadRequest(`Пользователь ${req.body.email} уже зарегистрирован.`))
         
      }
   }

   async login(req, res, next){
      try {
         const {email, password} = req.body
         const userData = await AuthService.login(email, password)
         res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
         res.json(userData)
      } catch (e){
         next(e)
      }
   }

   async logout(req, res, next){
      try{
         
         const {refreshToken} = req.cookies
         await AuthService.logout(refreshToken)
         res.clearCookie('refreshToken')
         return res.sendStatus(200)
      } catch(e){
         next(e)
      }
   }

   async createSuperuser(req, res){
      await AuthService.createSuperuser(req.query.first_name,req.query.last_name, req.query.email, req.query.password )
      res.sendStatus(200)
   }
}

module.exports = new AuthController()