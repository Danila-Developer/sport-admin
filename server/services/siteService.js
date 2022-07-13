const {YoutubeChannelVideosModel, YoutubeChannelsModel, RSSChannel, RSSPublication} = require('../models/adminModel')

class SiteService {
   async getYoutube(){
      const videoList = await YoutubeChannelVideosModel.findAll({where: {is_published: true}, order: [['date', 'DESC']], raw: true})
      
      
      return videoList

   }

   async getRss(){
      const videoList = await RSSPublication.findAll({where: {is_published: true}, order: [['createdAt', 'ASC']], raw: true})
      
      return videoList

   }
}

module.exports = new SiteService()

