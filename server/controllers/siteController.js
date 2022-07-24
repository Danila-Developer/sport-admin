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

   async getHome(req, res) {
      const videos = await SiteService.getVideoList(null, 3)
      const rssPublications = await SiteService.getRssPublications(null, 5)
      console.log(rssPublications)
      return res.render('site/home', {videos, rssPublications, HOST, PORT})
   }
}

module.exports = new SiteController()