const express = require('express')
const path = require('path')
const log = require('winston')

const app = express()

const clientFolder = path.join(__dirname, 'client/build')

let names = {}

// Serve static files
app.use(express.static(clientFolder))

// Returns names
app.get('/names', (req, res)=>{
	res.json(names)
})

// Fail over
app.get('*', (req, res)=>{
	res.sendFile(path.join(clientFolder, 'index.html'))
})

// Start up
const port = process.env.PORT || 5000
app.listen(port)

log.log('info', `Listing on port ${port}`)
