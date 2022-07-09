const express = require('express')

const SiteController = require('../controllers/siteController')

const Router = express.Router()

Router.get('/youtube-rss', SiteController.getYoutubeList)
Router.get('/rss', SiteController.getRssList)



module.exports = Router