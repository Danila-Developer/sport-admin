const SiteService = require('../services/siteService')
const config = require('../../config')
const { HOST, PORT } = config

class SiteController{

   async getYoutubeList(req, res){
      const videos = await SiteService.getYoutube()
      return res.render('site/home', {videos, HOST, PORT})
   }

   async getRssList(req, res){
      const rss = await SiteService.getRss()
      return res.render('site/rss', {rss, HOST, PORT})
   }
}

module.exports = new SiteController()