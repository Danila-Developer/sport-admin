const express = require('express')
const userAccess = require('../middlewares/userAccess')
const SiteController = require('../controllers/siteController')

const Router = express.Router()

Router.get('/home', SiteController.getYoutubeList)
Router.get('/rss', SiteController.getRssList)
Router.get('/', SiteController.getHome)
Router.get('/blog/create', userAccess, SiteController.getCreateBlog)
Router.post('/blog/create', userAccess, SiteController.postCreateBlog)



module.exports = Router