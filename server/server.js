const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

var publicPath = path.join(__dirname, '../public')
var app = express()

const PORT = process.env.PORT || 3000
app.use(express.static(publicPath))

let server = http.createServer(app)
let io = socketIO(server)

io.on('connection', (socket) => {
    console.log('New user connected')

    socket.emit('newMessage',{
        from:"Admin",
        text:"Welcome to chat app",
        createdAt: new Date().getTime()
    })
    socket.broadcast.emit('newMessage',{
        from:"Admin",
        text:"New User added",
        createdAt: new Date().getTime()
    })

    socket.on('createMessage',(message)=>{
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        })
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})


server.listen(PORT, () => {
    console.log('Server running in port 3000')
})