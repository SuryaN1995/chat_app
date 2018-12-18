var socket = io()
socket.on('connect', (socket) => {
    console.log('connected to server')
})

function scrollToBottom(){
    var messages = jQuery('#messages')
    var newMessage = messages.children('li:last-child')
    var clientHeight = messages.prop('clientHeight')
    var scrollTop = messages.prop('scrollTop')
    var scrollHeight = messages.prop('scrollHeight')
    var newMessageHeight = newMessage.innerHeight()
    var lastMessageHeight = newMessage.prev().innerHeight()

    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
        messages.scrollTop(scrollHeight)
    }
}

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

socket.on('newMessage',(message)=>{
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#message-template').html()
    var html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html)
    scrollToBottom()
})

socket.on('newLocationMessage',(message)=>{

    
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#location-template').html()
    var html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt: formattedTime,
        url: message.url
    })
    jQuery('#messages').append(html)
    scrollToBottom()
})

socket.emit('createMessage',{
    from:"Surya",
    text:"Hey guys"
},()=>{
    console.log("Got it")
})

jQuery('#message-form').on('submit',(e)=>{
    e.preventDefault()
    var message = jQuery('[name=message]')
    socket.emit('createMessage',{
        from:'User',
        text:message.val()
    },()=>{
        message.val('')
    })
})

var locationButton = jQuery('#send-location')
locationButton.on('click',function(){
    if(!navigator.geolocation)
        return alert("Geolocation is not supported")
    locationButton.attr('disabled','disabled').text('Sending location..')
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location')
        socket.emit('currentLocation',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    },function(){
        alert("Unable to fetch location")
    })
})

