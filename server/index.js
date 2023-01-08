require('dotenv').config()
const sequelize =  require('./db')
const express = require('express');
// const {User} = require('./models/models');
const cors = require("cors");
const fileUpload = require("express-fileupload")
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const runMigrations = require('./migration')
const {userOnlineStatus, userOfflineStatus} = require('./service/eventService')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {cors: {origin:"*"}})
const event = require('./events/event')(io)
const PORT = process.env.PORT || 5000
const fs = require('fs')
const join = require('path').join
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router);
app.use(errorHandler) // Обработка ошибок должен быть последним

require.extensions['.dxf'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};



io.on("connection", (socket) => {
    console.log('connect')
    socket.on('userAuth', (arg)=> {
        console.log('СОКЕТ ОТКРЫТ')
            userOnlineStatus(arg?.email)

            console.log(io.engine.clientsCount)
    socket.on("disconnect", (reason) => {
            userOfflineStatus(arg?.email)
        });


    })
    
    socket.on('forceDisconnect', function(arg){
        userOfflineStatus(arg)
    });


    socket.emit('hello', 'world')

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