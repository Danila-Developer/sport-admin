const {YoutubeChannelsModel, YoutubeChannelVideosModel, RSSPublication, RSSChannel} = require('../models/adminModel')
const RSSParser = require('rss-parser');
const axios = require('axios')
const cheerio = require('cheerio');
const config = require('../../config')
const { urlencoded } = require('body-parser');



class adminModel {
   constructor(){

   }

   async getMenuElements(callback){
      let menuElements = {}
      const res = await YoutubeChannelsModel.findAll({logging: false})
      menuElements.Youtube = []
      res.forEach(row => {
         menuElements.Youtube.push({channel_id: row.dataValues.id, channel_name: row.dataValues.channel_name})
      })
      const rssRes = await RSSChannel.findAll({raw: true})
      menuElements.RSS = []
      rssRes.forEach(row => {
         menuElements.RSS.push({channel_id: row.id, channel_name: row.channel_name})
      })
      return menuElements
   }

   async getAllVideoOfChannel(channel_id){
      const channelVideoList = await YoutubeChannelVideosModel.findAll({
         where: {
            youtubeChannelId: channel_id
         }
      })
      const videoList = []
      channelVideoList.forEach(video => {
         videoList.push(
            {
               id: video.dataValues.id,
               video_name: video.dataValues.video_name,
               author: video.dataValues.author, 
               is_published: video.dataValues.is_published,
               date: video.dataValues.date,
               channel_id: video.dataValues.youtubeChannelId
            }
         )
      })
      return videoList
   }

   async getChannelNameById(channel_id){
      const channel_name = await YoutubeChannelsModel.findOne({
         where:{id: channel_id}
      })
      return channel_name
   }

   async setVideoPublishedById(video_id, is_pub){
      console.log(video_id)
      await YoutubeChannelVideosModel.update({is_published: is_pub}, {where: {id: video_id}})
   }

   async getChannelByVideoId(video_id){
      const channel_name = await YoutubeChannelVideosModel.findOne({
         where:{id: video_id}
      })
      return channel_name.dataValues.youtubeChannelId
   }

   async getAllChannelsId(){
      const channelsId = await YoutubeChannelsModel.findAll({
         attributes: ['id'],
         raw: true,
      })
      let channelsIdArray = []
      if (channelsId.length){
         channelsId.forEach(channel => {
            channelsIdArray.push(channel.id)
         })
         return channelsIdArray
      }
      else return null
   }

   async getLastVideosId(channel_id){
      const lastVideoId = await YoutubeChannelVideosModel.findAll({
         where: {
            youtubeChannelId: channel_id
         },
         attributes: ['id'],
         raw: true,
         order: [['date', 'DESC']],
         limit: 1
      })
      if (lastVideoId.length) return lastVideoId[0].id
      else return null
   }

   async fetchYoutubeChannel(channel_id, parser){
      const lastVideoId = (await this.getLastVideosId(channel_id))
      let feed = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${channel_id}`)
      for (let i = 0; i < feed.items.length; i++) {
         if (lastVideoId != feed.items[i].id.split(':')[2]){
            const channel_id = feed.items[i].channel_id
            const video_id = feed.items[i].id.split(':')[2]
            const video_name = feed.items[i].title
            const description = feed.items[i].media['media:description'][0]
            const author = feed.items[i].author
            const date = feed.items[i].isoDate
            const preview_url = feed.items[i].media['media:thumbnail'][0]['$'].url
            const video_url = feed.items[i].link
            const is_published = false
            await YoutubeChannelVideosModel.create({
               id: video_id,
               video_name,
               description,
               author, 
               date,
               preview_url,
               video_url,
               is_published,
               youtubeChannelId: channel_id
               })
            } else break
      }
   }

   async fetchYoutube(){
      let parser = new RSSParser({
         customFields: {
            item: [
               ['media:group', 'media'],
               ['yt:channelId', 'channel_id']
            ],
         }
         });

      setInterval(async ()=> {
         const channelsId = await this.getAllChannelsId()
         if (channelsId != null){
            channelsId.forEach(async channel => {
               await this.fetchYoutubeChannel(channel, parser)
            })
            //await this.parseYoutubeChannel('https://www.youtube.com/user/pognalisho')
         }
      }, config.RSS_CHECK_INTERVAL)
   }

   async parseYoutubeChannel(link){
      let channel_id;
      let channel_name;
      axios.get(link)
      .then(async res => {
         const $ = cheerio.load(res.data)
         
         $('meta').each((i, elem) => {
            if (elem.attribs.itemprop == 'channelId') {
               channel_id = elem.attribs.content
            }
         })
         $('link').each((i, elem) => {
            if (elem.attribs.itemprop == 'name') {
               channel_name = elem.attribs.content
            }
         })
         const allChannels = await this.getAllChannelsId()
         console.log(allChannels + 'chen')
         if (allChannels == null) {
            await YoutubeChannelsModel.create({
               id: channel_id,
               channel_name: channel_name,
               channel_url: link
            })
         }
         if (!allChannels.indexOf(channel_id)){
            console.log(1)
         } else {
            console.log(2)
            await YoutubeChannelsModel.create({
               id: channel_id,
               channel_name: channel_name,
               channel_url: link
            })
         }
      }).catch(() => {

      })
   }

   async createYoutubeChannel(link){
      await this.parseYoutubeChannel(link)
   }

   async deleteChannel(channel_id) {
      await YoutubeChannelVideosModel.destroy({
         where: {
            youtubeChannelId: channel_id
         }
      })
      await YoutubeChannelsModel.destroy({
         where: {
            id: channel_id
         }
      })
   }
}

module.exports = adminModel