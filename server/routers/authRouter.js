const express = require('express')
const authController = require('../controllers/authController')
const cookieParser = require('cookie-parser')
const {body} = require('express-validator')

const Router = express.Router()

Router.post('/registration',
   body('email').isEmail(),
   body('email').notEmpty(),
   body('first_name').notEmpty(),
   body('last_name').notEmpty(),
   body('password').isLength({min: 6, max: 20 }),
   authController.registration
)
Router.post('/login', authController.login)
Router.get('/logout', authController.logout)

module.exports = Router