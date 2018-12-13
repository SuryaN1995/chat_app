const path = require('path')
const express = require('express')

var publicPath = path.join(__dirname,'../public')
var app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(publicPath))

app.listen(PORT,()=>{
    console.log('Server running in port 3000')
})