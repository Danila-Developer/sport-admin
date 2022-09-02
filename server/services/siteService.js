
const { YoutubeChannelVideosModel, YoutubeChannelsModel, RSSChannel, RSSPublication, PublicationCategoryModel, PublicationModel } = require('../models/adminModel')
const { UserModel } = require('../models/userModel')
const md5 = require('md5')
const axios = require('axios').default
const cheerio = require('cheerio')
const FileService = require('../services/imageService')

class SiteService {
   async getYoutube() {
      const videoList = await YoutubeChannelVideosModel.findAll({ where: { is_published: true }, order: [['date', 'DESC']], raw: true })


      return videoList

   }

   async getRss() {
      const videoList = await RSSPublication.findAll({ where: { is_published: true }, order: [['createdAt', 'ASC']], raw: true })

      return videoList

   }

   async getVideoList(channel_id = null, limit) {
      let videoList
      if (channel_id == null) {
         videoList = await YoutubeChannelVideosModel.findAll({ where: { is_published: true }, order: [['date', 'DESC']], raw: true, limit: limit })
      } else {
         videoList = await YoutubeChannelVideosModel.findAll({ where: { is_published: true, youtubeChannelId: channel_id }, order: [['date', 'DESC']], raw: true, limit: limit })
      }
      for (let i = 0; i < videoList.length; i++) {
         const channel = await YoutubeChannelsModel.findOne({ where: { id: videoList[i].youtubeChannelId }, raw: true })
         videoList[i]['channel_id'] = channel.id
      }

      return videoList
   }

   async getRssPublications(channel_id = null, limit) {
      let rssList
      if (channel_id == null) {
         rssList = await RSSPublication.findAll({ where: { is_published: true }, order: [['createdAt', 'DESC']], raw: true, limit: limit })
      } else {
         rssList = await RSSPublication.findAll({ where: { is_published: true, rssChannelId: channel_id }, order: [['createdAt', 'DESC']], raw: true, limit: limit })
      }
      for (let i = 0; i < rssList.length; i++) {
         const channel = await RSSChannel.findOne({ where: { id: rssList[i].rssChannelId }, raw: true })
         rssList[i]['channel'] = channel.channel_name
      }


      return rssList
   }

   async getRssPublication(publicationId) {
      const rss = await RSSPublication.findByPk(publicationId, {raw: true})
      const channel = await RSSChannel.findOne({ where: { id: rss.rssChannelId }, raw: true })
      rss['channel'] = channel.channel_name
      return rss
      
   }

   async getBlogCategory(categoryName) {
      let category = await PublicationCategoryModel.findOne({ where: { category_name: categoryName }, raw: true })
      if (category) return category.id
      else {
         const id = await md5(new Date())
         await PublicationCategoryModel.create({
            id,
            category_name: categoryName,
            color: 'none'
         })
         return id
      }
   }

   async createBlogPublication(body, userId) {
      // body = {title, category, content, img}
      let dateNow = new Date();
      let date = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}`
      const categoryId = await this.getBlogCategory(body.category)

      const id = md5(new Date())
      let img
      if (body.img) {
         img = await FileService.saveImage(body.img, 'publications')
      } else {
         img = false
      }
      setTimeout(async () => {
         await PublicationModel.create({
            id,
            title: body.title,
            content: body.content,
            img_url: img,
            is_published: true,
            date,
            publicationCategoryId: categoryId,
            userId: userId
         }, 1000)
      })

   }

   async getPublications(author_id = null, limit, id = null) {
      let pubList
      if (author_id == null) {
         pubList = await PublicationModel.findAll({ where: { is_published: true }, order: [['date', 'DESC']], raw: true, limit: limit })
      } else {
         pubList = await PublicationModel.findAll({ where: { is_published: true, userId: author_id }, order: [['date', 'DESC']], raw: true, limit: limit })
      }
      if (id != null) {
         pubList = await PublicationModel.findAll({ where: { is_published: true, id: id }, order: [['date', 'DESC']], raw: true, limit: limit })
      }
      for (let i = 0; i < pubList.length; i++) {
         const user = await UserModel.findOne({ where: { id: pubList[i].userId }, raw: true })
         pubList[i]['user'] = user.first_name + ' ' + user.last_name
      }
      for (let i = 0; i < pubList.length; i++) {
         const category = await PublicationCategoryModel.findOne({ where: { id: pubList[i].publicationCategoryId }, raw: true })
         pubList[i]['category'] = category.category_name
      }


      return pubList
   }

   async getRssPublicationText(rssPublicationId) {
      const rssPublication = await RSSPublication.findByPk(rssPublicationId, {raw: true})
      if (!rssPublication || !rssPublication.link) return
      const rssLink = rssPublication.link
      const {data} = await axios.get(rssLink)
      const $ = cheerio.load(data)
      const rssPublciationInnerHtml =  $('.material-item__content.js-mediator-article').html()

      return rssPublciationInnerHtml
   }

   async getRssPublicationImage(rssPublicationId) {
      const text = await this.getRssPublicationText(rssPublicationId)
      if (text) {
         const $ = cheerio.load(text)
         return $('img').attr().src
      }
      return false
      
   }

   async getYoutubeChannelList() {
      return await YoutubeChannelsModel.findAll({raw: true})
   }


   async getYoutubeChannelVideoList(channelId, videoId=null) {
      let videoList
      
      videoList = await YoutubeChannelVideosModel.findAll({ where: { is_published: true, youtubeChannelId: channelId }, order: [['date', 'DESC']], raw: true })
      
      for (let i = 0; i < videoList.length; i++) {
         const channel = await YoutubeChannelsModel.findOne({ where: { id: videoList[i].youtubeChannelId }, raw: true })
         videoList[i]['channel'] = channel.channel_name
         videoList[i]['channel_id'] = channel.id
      }

      return videoList
   }
}

module.exports = new SiteService()

