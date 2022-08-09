const TokenService = require('../services/tokenService')
const ApiError = require('../exeptions/apiError')
const config = require('../../config')


const {HOST, PORT} = config

module.exports = function (req, res, next){
   const {refreshToken} =  req.cookies
   const userData = TokenService.validateAccessToken(refreshToken)

   if (!userData) {
      return res.render('admin/admin-login', {HOST, PORT})
      //next(ApiError.UnauthorizedError())
      
   }

   if (userData.is_admin) {
      next()
   } else {
      res.render('admin/admin-login', {HOST, PORT})
      //res.sendStatus(403)
   }

}