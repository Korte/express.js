var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('Hi Sonny Korte')
})

app.get('/swap', function (req, res) {
    res.send('Hi Korte Sonny')
})

var server =  app.listen(3000, function(){

    console.log("sServer running at http://localhost:" + server.address().port)
})
