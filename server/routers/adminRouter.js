const { Router } = require('express')
const express = require('express')
const { send } = require('process')
const adminController = require('../controllers/adminController')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const Rourter = express.Router()

Rourter.get('/', adminController.getAdminHome)
Rourter.get('/youtube-channel/:channel_id', adminController.getChannelById)
Rourter.get('/set-video-published', adminController.setVideoPublished)
Rourter.post('/youtube-channel/add-channel', jsonParser, adminController.addYoutubeChannel)
Rourter.get('/youtube-channel/delete-channel/:channel_id', adminController.deleteChannel)
Rourter.get('/publications', adminController.GetPublicationList)
Rourter.get('/edit-publication', adminController.editPublication)
Rourter.get('/edit-publication/save', adminController.savePublication)
Rourter.get('/publications/set-published/:id/:is', adminController.setVideoPublished)
//Rourter.post('/edit-publication', adminController.savePublication)


module.exports = Rourter