var socket = io()
socket.on('connect', (socket) => {
    console.log('connected to server')
})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})
socket.on('newMessage',(email)=>{
    console.log('New Email',email)
})