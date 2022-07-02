const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    {
      dialect: 'sqlite',
      storage: 'sport_news_db.db',
      logging: false
    }
)