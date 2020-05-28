const jsSHA = require('jssha')
const btoa = require('btoa')
const express = require('express')
const app = express()

let applicationId = "d4e5d6.vidyo.io"
let developerKey = "0a336eb385914fe684cd9659cea8ea54"
const port = 3000

app.use(express.static('public'))

app.get('/token', (req, res) => {
  let thirtyMinutes = 30 * 60
  let response = JSON.stringify({
    token: generateToken(thirtyMinutes)
  })
  res.send(response)
})

function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(9999))
}

function generateToken(expiresInSecond) {
  var EPOCH_SECONDS = 62167219200
  var expires = Math.floor(Date.now() / 1000) + expiresInSecond + EPOCH_SECONDS
  var shaObj = new jsSHA("SHA-384", "TEXT")
  shaObj.setHMACKey(developerKey, "TEXT")
  jid = "demoUser" + getRandomInt() + '@' + applicationId
  var body = 'provision' + '\x00' + jid + '\x00' + expires + '\x00'
  shaObj.update(body)
  var mac = shaObj.getHMAC("HEX")
  var serialized = body + '\0' + mac
  return btoa(serialized)
}

app.listen(port, () => {
  console.log(`Listening on Port ${port}!`)
})



