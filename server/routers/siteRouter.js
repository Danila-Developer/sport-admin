const express = require('express')

const SiteController = require('../controllers/siteController')

const Router = express.Router()

Router.get('/home', SiteController.getYoutubeList)
Router.get('/rss', SiteController.getRssList)
Router.get('/', SiteController.getHome)



module.exports = Router