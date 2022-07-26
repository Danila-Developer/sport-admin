
const { YoutubeChannelVideosModel, YoutubeChannelsModel, RSSChannel, RSSPublication, PublicationCategoryModel, PublicationModel } = require('../models/adminModel')
const md5 = require('md5')

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

      return videoList
   }

   async getRssPublications(channel_id = null, limit) {
      let rssList
      if (channel_id == null) {
         rssList = await RSSPublication.findAll({ where: { is_published: true }, order: [['date', 'DESC']], raw: true, limit: limit })
      } else {
         rssList = await RSSPublication.findAll({ where: { is_published: true, rssChannelId: channel_id }, order: [['date', 'DESC']], raw: true, limit: limit })
      }
      for (let i = 0; i < rssList.length; i++) {
         const channel = await RSSChannel.findOne({ where: { id: rssList[i].rssChannelId }, raw: true })
         rssList[i]['channel'] = channel.channel_name
      }


      return rssList
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
         img = body.img
      } else {
         img = null
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
}

module.exports = new SiteService()

