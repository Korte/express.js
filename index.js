'use strict';

var express = require('express')
var app = express()

var fs = require('fs')
var path = require('path')
var _ = require('lodash')
var engines = require('consolidate')

var users = []

fs.readFile('users.json', {encoding: 'utf8'}, function(err, data) {
    if (err) throw err;

    JSON.parse(data).forEach(function (user) {
        user.name.full =  _.startCase(user.name.first + ' ' + user.name.last)
        users.push(user)
    })
})

function getUserFilePath (username) {
  return path.join(__dirname, 'users', username) + '.json'
}

function getUser (username) {
  var user = JSON.parse(fs.readFileSync(getUserFilePath(username), {encoding: 'utf8'}))
  user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
  _.keys(user.location).forEach(function (key) {
    user.location[key] = _.startCase(user.location[key])
  })
  return user
}

function saveUser (username, data) {
  var fp = getUserFilePath(username)
  fs.unlinkSync(fp) // delete the file
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), {encoding: 'utf8'})
}

app.engine('hbs', engines.handlebars)

app.use('/profilepics', express.static('./images'))

app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', function (req, res) {
    res.render('index', {users: users})
})

app.get(/big.*/, function (req, res, next){
    console.log('BIG USER ACCESS')
    next()
})

app.get(/.*dog.*/, function(req, res, next) {
    console.log('USER GOES WOOF')
    next()
})

app.get('/:username', function(req, res) {
    var username = req.params.username
    var user = getUser(username)

    res.render('user', {
        user:user,
        address: user.location
    })
})

var server =  app.listen(3000, function(){

    console.log("Server running at http://localhost:" + server.address().port)
})
