require('dotenv').config()
const express = require('express')
const app = express()
const Twit = require('twit')
const http = require('http')
const client = new Twit({
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_KEY_SECRET,
})
const randomGenerator = require('./combination')

function hoursToMilliseconds(hours, minutes = 0) {
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000)
}

function tweeted(err, data, response) {
    if (err) {
      console.log("Something Went wrong", err)
    } else {
       //console.log(data)
       console.log("Tweeted")
    }
}

function postTweet(text) {
    client.post('statuses/update', {
        status: text,
    }, tweeted)
}
app.set('port', process.env.PORT || 5000)
app.get('/', (req, res) => {
    res.send(randomGenerator.combo())
}).listen(app.get('port'), () => {
    console.log('App is running, server is listening on port', app.get('port'))
})

postTweet(randomGenerator.combo())
setInterval(() => http.get("http://cardsagainsthumanity-bot.herokuapp.com"), 18000)
setInterval(() => postTweet(randomGenerator.combo()), hoursToMilliseconds(3))