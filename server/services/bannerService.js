const {BannerModel, BannerTypeModel} = require('../models/adminModel')
const ImageService = require('../services/imageService')
const md5 = require('md5')

class BannerService {

   async getBannerCategories() {
      return await BannerTypeModel.findAll({raw: true})
   }

   async createBanner(typeId, img, link) {
      const imgPath = await ImageService.saveImage(img, 'banners')
      const id = md5(new Date())
      await BannerModel.create({
         id,
         bannerTypeId: typeId,
         img_url: imgPath,
         link
      })
   }

   async getAdminBannerList() {
      let bannerList = []
      const categories = await this.getBannerCategories()
      for (let i = 0; i < categories.length; i++) {
         const bannerByCategoryList = await BannerModel.findAll({raw: true, where: {bannerTypeId: categories[i].id}})
         if (bannerByCategoryList.length != 0) {
            const categoryId = categories[i].id
            const categoryName = categories[i].type_name
            bannerList.push({category: [categoryId, categoryName], banners: bannerByCategoryList})
         }
      }
      return bannerList
   }

   async deleteBanner(id) {
      await BannerModel.destroy({where: {id}})
   }

   async getRandomBanner(typeId) {
      const banners = await BannerModel.findAll({raw: true, where: {bannerTypeId: typeId}})
      const bannerIndex = Math.floor(Math.random() * banners.length)
      return banners[bannerIndex]
   }

   async getAllBannersByTypeId(typeId) {
      const banners = await BannerModel.findAll({raw: true, where: {bannerTypeId: typeId}})
      return banners
   }
}

module.exports = new BannerService()