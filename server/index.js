require('dotenv').config()
const sequelize =  require('./db')
const express = require('express');
const {User} = require('./models/models');
const cors = require("cors");
const fileUpload = require("express-fileupload")
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const runMigrations = require('./migration')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {cors: {origin:"*"}})


const PORT = process.env.PORT || 5000

const userOnlineStatus = async (email) => {
    if(email) {
        const user = await User.findOne({where: {email}})
        console.log(user)
        await user.update({isOnline: true})
        await user.save();
    } 

}

const userOfflineStatus = async (email) => {
    if(email) {
        const user = await User.findOne({where: {email}})
        await user.set({
            isOnline: false,
        })
        await user.save();
    } 

}




app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router);
app.use(errorHandler) // Обработка ошибок должен быть последним


io.on("connection", (socket) => {
    console.log('connect')
    socket.on('userAuth', (arg)=> {
        console.log('user')
        if(arg === null) {
            socket.disconnect(true)
        } else {
            console.log(arg)
            userOnlineStatus(arg?.email)
        }

    socket.on("disconnect", (reason) => {
        if(arg === null) {
            socket.disconnect(true)
        } else {
            console.log(arg)
            userOfflineStatus(arg?.email)
                    }
        });

    })
    


    socket.emit('hello', 'world')
    socket.on('disconnectUser', (arg)=> {
        console.log(arg)
    })
  });


const start = async () => {
    try {
      await  sequelize.authenticate()

      await  sequelize.sync()
    //   await runMigrations.runMigrations();
        http.listen(PORT, ()=> console.log(`Server started on port ${PORT}` ))
    } catch (e) {
        console.log(e)
    }
}




start();