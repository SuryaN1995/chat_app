const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const {generateMessage,generateLocationMessage} = require('../utils/messageGenerate')

var publicPath = path.join(__dirname, '../public')
var app = express()

const PORT = process.env.PORT || 3000
app.use(express.static(publicPath))

let server = http.createServer(app)
let io = socketIO(server)

io.on('connection', (socket) => {
    console.log('New user connected')

    socket.emit('newMessage',generateMessage("Admin","Welcome to chat app"))
    
    socket.broadcast.emit('newMessage',generateMessage('Admin','New UserAdded'))

    socket.on('createMessage',(message,callback)=>{
        io.emit('newMessage',generateMessage(message.from,message.text))
        callback()
    })

    socket.on('currentLocation',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude))
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})


server.listen(PORT, () => {
    console.log('Server running in port 3000')
})