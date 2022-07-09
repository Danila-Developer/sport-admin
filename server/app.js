const express = require('express')
const adminRouter = require('./routers/adminRouter')
const authRouter = require('./routers/authRouter')
const path = require('path')
const sequelize = require('./db')
const models = require('./models/adminModel')
const UserModels = require('./models/userModel')
const AdminService = require('./services/adminYouTubeService')
const bodyParser = require('body-parser');
const config = require('../config')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errorMiddleware')
const AdminRssService = require('./services/adminRssService')

const SiteRouter = require('./routers/siteRouter')

const PORT = process.env.PORT || config.PORT
const app = express(cookieParser())


app.use('/admin', express.static(path.resolve(__dirname, '../admin_static')))
app.use('/admin/youtube-channel', express.static(path.resolve(__dirname, '../admin_static')))
app.use('/admin/rss/list', express.static(path.resolve(__dirname, '../admin_static')))
app.use('/', express.static(path.resolve(__dirname, '../views/site')))

app.set('view engine', 'ejs')
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use('/admin', adminRouter)
app.use('/api/auth', authRouter)
app.use('/', SiteRouter)

app.set('views', path.resolve(__dirname, '../views'))
app.engine('ejs', require('ejs-mate'))
app.use(errorMiddleware)

new AdminService().fetchYoutube()
AdminRssService.fetchRSS()


const start = async () => {
   try {
       await sequelize.authenticate()
       await sequelize.sync()
       app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
   } catch (e) {
       console.log(e)
   }
}


start()