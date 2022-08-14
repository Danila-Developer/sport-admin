const {RSSPublication, RSSChannel} = require('../models/adminModel')
const RSSParser = require('rss-parser');
const config = require('../../config')
const md5 = require('md5')

class AdminRssService {

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
         order: [['createdAt', 'DESC']],
         limit: 1
      })
      if (lastRssPublicationTitle.length) return lastRssPublicationTitle[0].title
      else return null
   }

   async fetchRssChannel(channel_id, parser){

      try {
         const lastRssPublicationTitle = (await this.getLastRssPublicationTitle(channel_id))
         let feed = await parser.parseURL((await RSSChannel.findOne({where: {id: channel_id}, raw: true})).rss_link)

         const publications = await RSSPublication.findAll({where: {rssChannelId: channel_id}, raw: true, order: [['createdAt', 'DESC']], offset: 300})
         if (publications.length) {
            publications.forEach(async pub => {
               await RSSPublication.destroy({where: {id: pub.id}})
            })  
         }
         const newFeed = []
         for (let i = 0; i < feed.items.length; i++) {
            if (lastRssPublicationTitle != feed.items[i].title) {
               newFeed.push(feed.items[i])
            }
            else break
         }

         for (let i = newFeed.length-1; i >= 0; i--) {
            if (lastRssPublicationTitle != newFeed[i].title){
               let category
               if (newFeed[i].categories) {
                  category = newFeed[i].categories.reduce((prev, cur) => prev + ', ' + cur)
               } else {
                  category = null
               }

               
               

               const pub_id = md5(new Date()+i)
               const title = newFeed[i].title || null
               const link = newFeed[i].link || null

               if (link.split('/')[2] == 'sprts.cc') continue

               const creator = newFeed[i].creator || null
               const content = newFeed[i].content || null
               
               const date = newFeed[i].isoDate.split('T')[0] || null
               const is_published = true
               
               
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
        
      }
      
      
   }

   async fetchRSS(){
      let parser = new RSSParser()

      setInterval(async ()=> {
         const channelsId = await this.getAllChannelsId()
         
         if (channelsId != null){
            channelsId.forEach(async channel => {
               await this.fetchRssChannel(channel, parser)
            })

         }
      }, config.RSS_CHECK_INTERVAL)
   }

   async addRssChannel(channel_name, rss_link){
      const id = md5(new Date())
      await RSSChannel.create({id, channel_name, link})
   }

   async deleteRssChannel(channel_id){
      await RSSPublication.destroy({where: {rssChannelId: channel_id}})
      await RSSChannel.destroy({where: {id: channel_id}})
   }

   async getAllRssChannelPublication(channel_id){
      const rssPublications = await RSSPublication.findAll({where: {rssChannelId: channel_id}, order: [['createdAt', 'DESC']], raw: true, limit: 50})
      return rssPublications
   }

   async getRssChannelName(channel_id){
      return (await RSSChannel.findOne({where: {id: channel_id}, raw: true})).channel_name
   }

   async setPublished(id, is_pub){
      await RSSPublication.update({is_published: is_pub}, {where: {id: id}})
   }

   async createRssChannel(name, link){
      const id = md5(new Date())
      await RSSChannel.create({
         id,
         channel_name: name,
         rss_link: link
      })
   }

   
}

module.exports = new AdminRssService()