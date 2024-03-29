const express = require('express')
const userAccess = require('../middlewares/userAccess')
const SiteController = require('../controllers/siteController')

const Router = express.Router()

Router.get('/home', SiteController.getYoutubeList)
Router.get('/rss', SiteController.getRssList)
Router.get('/', SiteController.getHome)
Router.get('/blog/create', userAccess, SiteController.getCreateBlog)
Router.post('/blog/create', userAccess, SiteController.postCreateBlog)
Router.get('/blog/:id', SiteController.getSingeBlog)
Router.get('/rss/:id', SiteController.getRssPublication)
Router.get('/youtube/:id', SiteController.getYoutubeChannelPage)
Router.get('/rss-banner', SiteController.getRandomBanner)
Router.get('/youtube-channels/list', SiteController.getYoutubeChannelListJSON)
Router.get('/youtube-videos/list/:id', SiteController.getYoutubeChannelVideoListJSON)


module.exports = Router