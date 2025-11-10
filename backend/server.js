const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { database } = require("./utils/database")
const AuthRoute = require('./routes/authRoute.js')
const UserRoute = require('./routes/userRoute.js')
const ProductRoute = require('./routes/productRoute.js')
const CartRoute = require('./routes/cartRoute.js')
const favRoute = require('./routes/favRoute.js')
const addressRoute = require('./routes/userAddressRoute.js')
const profileRoute = require('./routes/userProfileRoute.js')
const app = express()

app.use(express.json())
//cross origin resource sharing
app.use(cors())

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/product', ProductRoute)
app.use('/cart', CartRoute)
app.use('/fav', favRoute)
app.use('/address', addressRoute)
app.use('/profile', profileRoute)

const start = async () => {
    try {
        const connect = await database()
        app.listen(process.env.PORT, () => {
            console.log('server is listening...')
        })
    } catch (error) {
        console.log(error)
    }

}
start()