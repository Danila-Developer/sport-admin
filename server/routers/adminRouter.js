const { Router } = require('express')
const express = require('express')
const { send } = require('process')
const adminController = require('../controllers/adminController')
const bodyParser = require('body-parser')
const adminAccessMiddleware = require('../middlewares/adminAccessMiddleware')

const jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const Rourter = express.Router()


Rourter.get('/', adminAccessMiddleware, adminController.getAdminHome)
Rourter.get('/youtube-channel/:channel_id', adminAccessMiddleware, adminController.getChannelById)
Rourter.get('/set-video-published', adminAccessMiddleware, adminController.setVideoPublished)
Rourter.post('/youtube-channel/add-channel', jsonParser, adminController.addYoutubeChannel)
Rourter.get('/youtube-channel/delete-channel/:channel_id', adminAccessMiddleware, adminController.deleteChannel)
Rourter.get('/publications', adminAccessMiddleware, adminController.GetPublicationList)
Rourter.get('/edit-publication', adminAccessMiddleware, adminController.editPublication)
Rourter.get('/edit-publication/save', adminAccessMiddleware, adminController.savePublication)
Rourter.get('/publications/set-published/:id/:is', adminAccessMiddleware, adminController.setPublished)
//Rourter.post('/edit-publication', adminController.savePublication)
Rourter.post('/publications/add-category', adminController.addCategory)
Rourter.get('/rss/list/:id', adminAccessMiddleware, adminController.getRssList)
Rourter.get('/rss/delete/:id', adminController.deleteRss)
Rourter.get('/rss/set-published', adminController.setRssPublished)
Rourter.post('/rss/add-channel', adminController.addRssChannel)

Rourter.get('/banner/create', adminAccessMiddleware, adminController.getCreateBanner)
Rourter.post('/banner/create', adminAccessMiddleware, adminController.postSaveBanner)
Rourter.get('/banner', adminAccessMiddleware, adminController.getBannerListPage)
Rourter.delete('/banner', adminAccessMiddleware, adminController.deleteBanner)
module.exports = Rourter