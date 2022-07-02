const path = require('path')
const adminModel = require('../services/adminYouTubeService')
const adminMod = require('../services/adminYouTubeService')
const AdminPublicationsService = require('../services/adminPublicationsService')

class AdminController{
   async getAdminHome(req, res) {
      const adminModel = new adminMod()
      const menuElements = await adminModel.getMenuElements()
      return res.render('admin/admin-home', {menuEl: menuElements})
   }

   async getChannelById(req, res){
      const adminModel = new adminMod()
      const channelVideoList = await adminModel.getAllVideoOfChannel(req.params.channel_id)
      const menuElements = await adminModel.getMenuElements()
      const ch_name = await adminModel.getChannelNameById(req.params.channel_id)
      return res.render('admin/youtube-channel-video-list', {menuEl: menuElements, 
                                                      videoList: channelVideoList, 
                                                      channel_name: ch_name.dataValues.channel_name,
                                                      channel_id: req.params.channel_id})
   }

   async setVideoPublished(req, res){
      const adminModel = new adminMod()
      await adminModel.setVideoPublishedById(req.query.video_id, req.query.is_published)
      const channel_id = await adminModel.getChannelByVideoId(req.query.video_id)
      res.redirect("/admin/youtube-channel/"+channel_id)
   }

   async addYoutubeChannel(req, res){
      // const adminModel = new adminMod()
      // const error = await adminModel.parseYoutubeChannel(req.body.channel_link)
      // console.log(error)
      // if (error == 'error') return res.status(500).send('err')
      // else return res.status(200).send('ok')
      const adminModel = new adminMod()
      await adminModel.createYoutubeChannel(req.body.channel_link)
      
      return res.status(200).send('ok')
   }
   
   async deleteChannel(req, res){
      const adminModel = new adminMod()
      await adminModel.deleteChannel(req.params.channel_id)
      return res.send('ok')
   }

   async GetPublicationList(req, res){
      const adminModel = new adminMod()
      const allPublications = await AdminPublicationsService.getAllPublications()
      const menuElements = await adminModel.getMenuElements()
      res.render('admin/publication_list', {menuEl: menuElements, allPublications})
   }

   async editPublication(req, res){
      const adminModel = new adminMod()
      const menuElements = await adminModel.getMenuElements()
      const categories = await AdminPublicationsService.getAllPublicationCategiries()
      res.render('admin/publication-edit', {menuEl: menuElements, categories})
   }

   async savePublication(req, res){
      console.log(req.query)
      await AdminPublicationsService.savePublication({title: req.query.title, content: req.query.content, category_id: req.query.category_id})
      return res.rend('ok')
   }

   async setPublished(req, res){
      console.log(req.params.id)
      await AdminPublicationsService.setPublicationPublished(req.params.id, req.params.is)
   }


}

module.exports = new AdminController()