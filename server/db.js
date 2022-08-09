const {Sequelize} = require('sequelize')

module.exports = new Sequelize('postgres://postgres:sport@87.236.22.250:5432/sport_news_db', {logging: false})