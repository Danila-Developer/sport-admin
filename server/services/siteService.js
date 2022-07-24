
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

   async getVideoList(channel_id = null, limit){
      let videoList
      if (channel_id == null) {
         videoList = await YoutubeChannelVideosModel.findAll({where: {is_published: true}, order: [['date', 'DESC']], raw: true, limit: limit})
      } else {
         videoList = await YoutubeChannelVideosModel.findAll({where: {is_published: true, youtubeChannelId: channel_id}, order: [['date', 'DESC']], raw: true, limit: limit})
      }
      
      return videoList
   }

   async getRssPublications(channel_id = null, limit){
      let rssList
      if (channel_id == null) {
         rssList = await RSSPublication.findAll({where: {is_published: true}, order: [['date', 'DESC']], raw: true, limit: limit})
      } else {
         rssList = await RSSPublication.findAll({where: {is_published: true, rssChannelId: channel_id}, order: [['date', 'DESC']], raw: true, limit: limit})
      }
      for (let i = 0; i < rssList.length; i++){
         const channel = await RSSChannel.findOne({where: {id: rssList[i].rssChannelId}, raw: true})
         rssList[i]['channel'] = channel.channel_name
      }
      
      
      return rssList
   }
}

module.exports = new SiteService()

