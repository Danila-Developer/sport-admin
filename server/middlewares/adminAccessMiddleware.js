const TokenService = require('../services/tokenService')
const ApiError = require('../exeptions/apiError')
const config = require('../../config')


const {HOST, PORT} = config

module.exports = function (req, res, next){
   const {refreshToken} =  req.cookies
   console.log(refreshToken)
   const userData = TokenService.validateAccessToken(refreshToken)
   console.log(userData)

   if (!userData) {
      return res.render('admin/admin-login', {HOST, PORT})
      //next(ApiError.UnauthorizedError())
      
   }

   if (userData.is_admin) {
      next()
   } else {
      res.render('admin/publication_list')
      //res.sendStatus(403)
   }

}