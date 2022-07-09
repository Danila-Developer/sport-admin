const {RSSPublication, RSSChannel} = require('../models/adminModel')
const RSSParser = require('rss-parser');
const config = require('../../config')
const md5 = require('md5')

class AdminRssService {

   async testChannel(){
      //let parser = new RSSParser()
     // let feed = await parser.parseURL('http://vz.ru/rss.xml')
      //console.log(feed)
   }


   async getAllChannelsId(){
      const channelsId = await RSSChannel.findAll({
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



   async getLastRssPublicationTitle(channel_id){
      const lastRssPublicationTitle = await RSSPublication.findAll({
         where: {
            rssChannelId: channel_id
         },
         attributes: ['title'],
         raw: true,
         order: [['createdAt', 'ASC']],
         limit: 1
      })
      if (lastRssPublicationTitle.length) return lastRssPublicationTitle[0].title
      else return null
   }

   async fetchRssChannel(channel_id, parser){

      try {
         const lastRssPublicationTitle = (await this.getLastRssPublicationTitle(channel_id))
         let feed = await parser.parseURL((await RSSChannel.findOne({where: {id: channel_id}, raw: true})).rss_link)
         
         for (let i = 0; i < feed.items.length; i++) {
            if (lastRssPublicationTitle != feed.items[i].title){
               let category
               if (feed.items[i].categories) {
                  category = feed.items[i].categories.reduce((prev, cur) => prev + ', ' + cur)
               } else {
                  category = null
               }
               

               const pub_id = md5(new Date()+i)
               const title = feed.items[i].title || null
               const link = feed.items[i].link || null
               const creator = feed.items[i].creator || null
               const content = feed.items[i].content || null
               
               const date = feed.items[i].isoDate.split('T')[0] || null
               const is_published = false
               
               
               await RSSPublication.create({
                  id: pub_id,
                  title,
                  link,
                  creator,
                  content,
                  categories: category,
                  date,
                  is_published,
                  rssChannelId: channel_id
                  })
            } else break
            
         }  
      } catch(e){
         console.log('Некорректный канал')
      }
      
      
   }

   async fetchRSS(){
      let parser = new RSSParser()

      setInterval(async ()=> {
         const channelsId = await this.getAllChannelsId()
         console.log(channelsId)
         if (channelsId != null){
            channelsId.forEach(async channel => {
               await this.fetchRssChannel(channel, parser)
            })
            //await this.parseYoutubeChannel('https://www.youtube.com/user/pognalisho')
         }
      }, config.RSS_CHECK_INTERVAL)
   }

   async addRssChannel(channel_name, rss_link){
      const id = md5(new Date())
      await RSSChannel.create({id, channel_name, link})
   }

   async deleteRssChannel(channel_id){
      console.log(channel_id + 'gdfgdfgdfgdfgdgd')
      await RSSPublication.destroy({where: {rssChannelId: channel_id}})
      await RSSChannel.destroy({where: {id: channel_id}})
   }

   async getAllRssChannelPublication(channel_id){
      const rssPublications = await RSSPublication.findAll({where: {rssChannelId: channel_id}, raw: true})
      console.log(channel_id)
      return rssPublications
   }

   async getRssChannelName(channel_id){
      return (await RSSChannel.findOne({where: {id: channel_id}, raw: true})).channel_name
   }

   async setPublished(id, is_pub){
      await RSSPublication.update({is_published: is_pub}, {where: {id: id}})
   }

   
}

module.exports = new AdminRssService()