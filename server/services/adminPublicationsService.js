const {PublicationCategoryModel, PublicationModel} = require('../models/adminModel')
const md5 = require('md5')

class AdminPublicationsService{

   async getAllPublications(){
      const allPublications = await PublicationModel.findAll({logging: false, raw: true, order: [['createdAt', 'DESC']]})
      const newPub = await Promise.all(allPublications.map(async pub => {
         let pubCategory = await PublicationCategoryModel.findAll({logging: false, raw: true,
            where: {
               id: pub.publicationCategoryId
            }
         })
         pub.category = pubCategory
         pub.createdAt = `${String(pub.createdAt.getDate()).padStart(2, '0')}-${(String(pub.createdAt.getMonth()+1)).padStart(2, '0')}-${pub.createdAt.getFullYear()}`
         return pub
      }))
      return newPub
   }

   async getAllPublicationCategiries(){
      // возвращает id и category_name
      const categories = await PublicationCategoryModel.findAll({logging: false, raw: true})
      const catIdAndName = []
      categories.forEach(cat => {
         let id = cat.id
         let name = cat.category_name
         catIdAndName.push({id, name})
      })
      return catIdAndName
   }
   
   async savePublication(data){
      // create new
      let dateNow = new Date();
      let date = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}`
      const id = md5(dateNow)
      await PublicationModel.create({
         id,
         title: data.title,
         content: data.content,
         img_url: data.img_url,
         is_published: false,
         date,
         publicationCategoryId: data.category_id
      })
   }

   async setPublicationPublished(video_id, is_pub){
      await PublicationModel.update({is_published: is_pub}, {where: {id: video_id}})
   }

   async addCategory(category_name){
      await PublicationCategoryModel.create({id: 'cooking', category_name, color: 'fd'})
   }
}

module.exports = new AdminPublicationsService()