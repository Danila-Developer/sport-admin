const path = require('path')
const adminModel = require('../services/adminYouTubeService')
const adminMod = require('../services/adminYouTubeService')
const AdminPublicationsService = require('../services/adminPublicationsService')
const config = require('../../config')
const TokenService = require('../services/tokenService')
const AuthService = require('../services/authService')
const adminRssService = require('../services/adminRssService')


const { HOST, PORT } = config

class AdminController {
   async getAdminHome(req, res) {
      const userId = TokenService.validateAccessToken(req.cookies.refreshToken).id
      const user = await AuthService.getUserById(userId)
      const adminModel = new adminMod()
      const menuElements = await adminModel.getMenuElements()
      return res.render('admin/admin-home', { menuEl: menuElements, HOST, PORT, user })
   }

   async getChannelById(req, res) {
      const userId = TokenService.validateAccessToken(req.cookies.refreshToken).id
      const user = await AuthService.getUserById(userId)
      const adminModel = new adminMod()
      const channelVideoList = await adminModel.getAllVideoOfChannel(req.params.channel_id)
      const menuElements = await adminModel.getMenuElements()
      const ch_name = await adminModel.getChannelNameById(req.params.channel_id)
      return res.render('admin/youtube-channel-video-list', {
         menuEl: menuElements,
         videoList: channelVideoList,
         channel_name: ch_name.dataValues.channel_name,
         channel_id: req.params.channel_id,
         HOST, PORT, user
      })
   }

   async setVideoPublished(req, res) {
      const adminModel = new adminMod()
      await adminModel.setVideoPublishedById(req.query.video_id, req.query.is_published)
      const channel_id = await adminModel.getChannelByVideoId(req.query.video_id)
      res.redirect("/admin/youtube-channel/" + channel_id)
   }

   async addYoutubeChannel(req, res) {
      // const adminModel = new adminMod()
      // const error = await adminModel.parseYoutubeChannel(req.body.channel_link)
      // console.log(error)
      // if (error == 'error') return res.status(500).send('err')
      // else return res.status(200).send('ok')
      const adminModel = new adminMod()
      await adminModel.createYoutubeChannel(req.body.channel_link)

      return res.status(200).send('ok')
   }

   async deleteChannel(req, res) {
      const adminModel = new adminMod()
      await adminModel.deleteChannel(req.params.channel_id)
      return res.send('ok')
   }

   async GetPublicationList(req, res) {
      const userId = TokenService.validateAccessToken(req.cookies.refreshToken).id
      const user = await AuthService.getUserById(userId)
      const adminModel = new adminMod()
      const allPublications = await AdminPublicationsService.getAllPublications()
      const menuElements = await adminModel.getMenuElements()
      res.render('admin/publication_list', { menuEl: menuElements, allPublications, HOST, PORT, user })
   }

   async editPublication(req, res) {
      const userId = TokenService.validateAccessToken(req.cookies.refreshToken).id
      const user = await AuthService.getUserById(userId)
      const adminModel = new adminMod()
      const menuElements = await adminModel.getMenuElements()
      const categories = await AdminPublicationsService.getAllPublicationCategiries()
      res.render('admin/publication-edit', { menuEl: menuElements, categories, HOST, PORT, user })
   }

   async savePublication(req, res) {
      console.log(req.query)
      await AdminPublicationsService.savePublication({
         title: req.query.title,
         content: req.query.content,
         category_id: req.query.category_id,
      })
      return res.send('ok')
   }

   async setPublished(req, res) {
      await AdminPublicationsService.setPublicationPublished(req.params.id, req.params.is)
      res.sendStatus(200)
   }

   async addCategory(req, res) {
      await AdminPublicationsService.addCategory(req.body.category_name)
      res.sendStatus(200)
   }

   async getRssList(req, res) {
      const userId = TokenService.validateAccessToken(req.cookies.refreshToken).id
      const user = await AuthService.getUserById(userId)
      const adminModel = new adminMod()
      const menuElements = await adminModel.getMenuElements()

      const rssChannelPublicationList = await adminRssService.getAllRssChannelPublication(req.params.id)
      const rssChannelName = await adminRssService.getRssChannelName(req.params.id)

      return res.render('admin/admin-rss-list', { menuEl: menuElements, HOST, PORT, user, RSS: rssChannelPublicationList, rssChannelName })
   }

   async setRssPublished(req, res){
      await adminRssService.setPublished(req.query.rss_id, req.query.is_published)
      res.sendStatus(200)
   }

   async deleteRss(req, res){
      console.log(req.params.id)
      await adminRssService.deleteRssChannel(req.params.id)
   }


}

module.exports = new AdminController()