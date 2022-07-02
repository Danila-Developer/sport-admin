const express = require('express')
const adminRouter = require('./routers/adminRouter')
const path = require('path')
const sequelize = require('./db')
const models = require('./models/adminModel')
const AdminService = require('./services/adminYouTubeService')
const bodyParser = require('body-parser');

const PORT = 3000
const app = express()


app.use('/admin', express.static(path.resolve(__dirname, '../admin_static')))
app.use('/admin/youtube-channel', express.static(path.resolve(__dirname, '../admin_static')))
app.use('/admin', adminRouter)
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.resolve(__dirname, '../views'))
app.engine('ejs', require('ejs-mate'))

new AdminService().fetchYoutube()

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