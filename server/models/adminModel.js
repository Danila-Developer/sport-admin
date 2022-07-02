const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const YoutubeChannelsModel = sequelize.define('youtube_channels', {
    id: {type: DataTypes.STRING, primaryKey: true},
    channel_name: {type: DataTypes.STRING},
    channel_url: {type: DataTypes.STRING},
})

const YoutubeChannelVideosModel = sequelize.define('youtube_channel_videos', {
    id: {type: DataTypes.STRING, primaryKey: true},
    video_name: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT},
    author: {type: DataTypes.STRING},
    date: {type: DataTypes.STRING},
    preview_url: {type: DataTypes.STRING},
    video_url: {type: DataTypes.STRING},
    is_published: {type: DataTypes.BOOLEAN},
})

const PublicationModel = sequelize.define('publication', {
    id: {type: DataTypes.STRING, primaryKey: true},
    title: {type: DataTypes.STRING},
    content:  {type: DataTypes.TEXT},
    img_url: {type: DataTypes.STRING},
    is_published: {type: DataTypes.BOOLEAN},
    date: {type: DataTypes.STRING}
})

const PublicationCategoryModel = sequelize.define('publication_category', {
    id: {type: DataTypes.STRING, primaryKey: true},
    category_name: {type: DataTypes.STRING, primaryKey: true},
    color: {type: DataTypes.STRING, primaryKey: true}
})

YoutubeChannelsModel.hasMany(YoutubeChannelVideosModel)
YoutubeChannelVideosModel.belongsTo(YoutubeChannelsModel)
PublicationCategoryModel.hasMany(PublicationModel)
PublicationModel.belongsTo(PublicationCategoryModel)



module.exports = {
    YoutubeChannelsModel,
    YoutubeChannelVideosModel,
    PublicationModel,
    PublicationCategoryModel
}