var socket = io()
socket.on('connect', (socket) => {
    console.log('connected to server')
})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})
socket.on('newMessage',(message)=>{
    console.log('New message',message)
    var li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`)
    jQuery('#messages').append(li)
})

socket.emit('createMessage',{
    from:"Surya",
    text:"Hello assholes"
},()=>{
    console.log("Got it")
})

jQuery('#message-form').on('submit',(e)=>{
    e.preventDefault()
    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    },()=>{

    })
})