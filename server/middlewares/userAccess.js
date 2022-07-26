const TokenService = require('../services/tokenService')
const ApiError = require('../exeptions/apiError')
const config = require('../../config')


const {HOST, PORT} = config

module.exports = function (req, res, next){
   const {refreshToken} =  req.cookies
   console.log(refreshToken)
   const userData = TokenService.validateAccessToken(refreshToken)
   console.log(userData)

   

   if (userData) {
      req['userId'] = userData.id
      next()
   } else {
      res.redirect(`http://${HOST}:${PORT}/`)
      //res.sendStatus(403)
   }

}