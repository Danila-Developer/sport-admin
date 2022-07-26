const SiteService = require('../services/siteService')
const config = require('../../config')
const { HOST, PORT } = config
const TokenService = require('../services/tokenService')
const AuthService = require('../services/authService')


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
      let user
      try {
         const userId = TokenService.validateAccessToken(req.cookies.refreshToken).id
         user = await AuthService.getUserById(userId)
      } catch {
         user = null
      }
      
      const videos = await SiteService.getVideoList(null, 3)
      const rssPublications = await SiteService.getRssPublications(null, 5)
      console.log(rssPublications)
      return res.render('site/home', {videos, rssPublications, HOST, PORT, user})
   }

   async getCreateBlog(req, res) {
      let user
      try {
         const userId = TokenService.validateAccessToken(req.cookies.refreshToken).id
         user = await AuthService.getUserById(userId)
      } catch {
         user = null
      }
      return res.render('site/page-create-blog-publication', {user, HOST, PORT})
   }

   async postCreateBlog(req, res) {
      await SiteService.createBlogPublication(req.body, req.userId)
      return res.sendStatus(200)
   }
}

module.exports = new SiteController()