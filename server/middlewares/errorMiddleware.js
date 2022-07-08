const apiError = require('../exeptions/apiError')

module.exports = function(err, req, res, next){
   console.log(err)

   if (err instanceof apiError){
      return res.status(err.status).json({message: err.message, errors: err.errors})
   }

   return res.status(400).json({message: 'Непредвидененная ошибка'})
}