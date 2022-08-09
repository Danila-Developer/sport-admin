const fr = require('fs')
const pathLib = require('path')
const md5 = require('md5')
const config = require('../../config')

class FileService {
   async saveImage(base64Data, path) {
      let imgFormat = base64Data.split(';')[0].split('/')[1]
      if (imgFormat == 'jpeg') imgFormat = 'jpg'
      const base64DataClear = base64Data.split(',')[1]
      const fileName = md5(new Date()) + '.' + imgFormat
      const imagePath = pathLib.resolve(__dirname, '../../uploads', path, fileName)
      fr.writeFileSync(imagePath, base64DataClear, 'base64', e => {

      })
      
      return `uploads/${path}/${fileName}`
   }
}

module.exports = new FileService()