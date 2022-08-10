require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const server = express()
const port = 3000

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use('/', express.static(path.join(__dirname, '../public')))


// Apod API call
server.get('/apod', async(req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

//Manifest API call 
server.get('/roverData/:rover', async(req, res) => {
    let rover = req.params.rover
    try {
        let data = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ data })
    } catch (err) {
        console.log('error:', err);
    }
})

//Photos API call 
server.get('/roverPhotos/:rover', async(req, res) => {
    let rover = req.params.rover
    try {
        let photos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latsest_photos?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ photos })
    } catch (err) {
        console.log('error:', err);
    }
})

server.listen(port, () => console.log(`server listening on port ${port}!`))