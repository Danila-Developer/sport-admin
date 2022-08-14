const SiteService = require('../services/siteService')
const config = require('../../config')
const { HOST, PORT } = config
const TokenService = require('../services/tokenService')
const AuthService = require('../services/authService')
const siteService = require('../services/siteService')
const bannerService = require('../services/bannerService')


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
      const publications = await SiteService.getPublications(null, 10)
      const videos = await SiteService.getVideoList(null, 3)
      const rssPublications = await SiteService.getRssPublications(null, 10)
      const siderBanner = await bannerService.getRandomBanner('sider')

      return res.render('site/home', {videos, rssPublications, HOST, PORT, user, publications, siderBanner})
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

   async getSingeBlog(req, res) {
      let user
      try {
         const userId = TokenService.validateAccessToken(req.cookies.refreshToken).id
         user = await AuthService.getUserById(userId)
      } catch {
         user = null
      }
      const publication = await SiteService.getPublications(null, 1, req.params.id)
      const siderBanner = await bannerService.getRandomBanner('sider')

      return res.render('site/single-blog', { HOST, PORT, user, publication, siderBanner})
   }

   async getRssPublication(req, res) {
      let user
      try {
         const userId = TokenService.validateAccessToken(req.cookies.refreshToken).id
         user = await AuthService.getUserById(userId)
      } catch {
         user = null
      }
      const rssPublicationText = await siteService.getRssPublicationText(req.params.id)
      const rssPublication = await siteService.getRssPublication(req.params.id)
      const siderBanner = await bannerService.getRandomBanner('sider')
      const rssBanners = await bannerService.getAllBannersByTypeId('rss')
      const rssPublications = await siteService.getRssPublications(null, 5)
      return res.render('site/single-rss-publication', {user, HOST, PORT, rssPublicationText, publication: rssPublication, rssPublications, siderBanner, rssBanners})
   }



   async getYoutubeChannelPage(req, res) {
      let user
      try {
         const userId = TokenService.validateAccessToken(req.cookies.refreshToken).id
         user = await AuthService.getUserById(userId)
      } catch {
         user = null
      }

      const channelList = await siteService.getYoutubeChannelList()
      const youtubeBanner = await bannerService.getRandomBanner('youtube')
      const channelVideoList = await siteService.getYoutubeChannelVideoList(req.params.id)
      
      if (req.query.vid) {
         return res.render('site/single-youtube', { HOST, PORT, user, channelList, channelVideoList, vid: req.query.vid, youtubeBanner})
      }
      

      return res.render('site/single-youtube', { HOST, PORT, user, channelList, channelVideoList, vid: null, youtubeBanner})
   }

   async getRandomBanner(req, res) {
      const rssBanner = await bannerService.getRandomBanner('rss')
      res.send(rssBanner)
   }


}

module.exports = new SiteController()