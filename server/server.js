const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const log = require('./logger')
const database = require('./database')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const clientFolder = path.join(__dirname, '..', 'client/build')

let names = []

// Init database and names
database.createDatabase(() => {
	database.loadNames((err, loaded) => {
		if (loaded){
			names = loaded;
		}
	})
})

saveNames = () => {
	database.saveNames(names)
}

// Save the names every minute
setInterval(() => {
	saveNames()
}, 60000)

// Accept json
app.use(bodyParser.json())

// Serve static files
app.use(express.static(clientFolder))

let connectedCount = 0

// Send names to all
sendNames = () => {
	log.debug("Sending names to all connected")
	io.sockets.emit('names', names)
}

io.on('connection', socket => {
	log.debug("A user connected")
	connectedCount++
	log.debug(`There are ${connectedCount} connected users`)

	socket.on('disconnect', () => {
		log.debug("A user disconnected")
		connectedCount--
		log.debug(`There are ${connectedCount} connected users`)
	})

	socket.on('request names', () => {
		log.debug("Client requested names")
		// Send names to client
		socket.emit('names', names)
	})
})

// Match param to name object
app.param('nameId', (req, res, next, nameId) => {
	names.forEach(name => {
		if (`${name.id}` === nameId){
			req.name = name
		}
	})
	next()
})

// Add vote
app.post('/names/:nameId/vote', (req, res)=>{
	// Validate request
	const { name } = req
	if (!req.body.vote){
		log.warn("Invalid request to add vote")
		res.sendStatus(400)
		return
	}
	if (!req.name){
		log.warn("Invalid request to add vote to name not found")
		res.sendStatus(404)
		return
	}
	if (req.body.vote > 0){
		name.votes++
	} else if (req.body.vote < 0){
		name.votes--
	} else {
		name.votes = 0
	}
	log.debug(`Vote for ${name.name} recorded`)
	res.sendStatus(200)
	sendNames()
})

// Add name
app.post('/names', (req, res)=>{
	let reqName = req.body.name
	if (!reqName){
		res.sendStatus(400)
		return
	}
	// Trim whitespace, make title case
	reqName = reqName.trim().replace(/(^|\s)\S/g, t => t.toUpperCase())
	log.debug(`Adding name ${reqName}`)
	let topId = 1
	// Ensure the list is up to date
	database.loadNames((err, loaded) => {
		if (loaded){
			names = loaded
		}
		for (let i = 0; i < names.length; i++){
			const name = names[i]
			topId = topId > name.id ? topId : name.id
			if (name.name === reqName){
				log.debug(`Attempt to submit name ${name.name} already supplied`)
				// Already in the list, that's ok
				res.sendStatus(204)
				return
			}
		}
		names.push({
			id: topId + 1,
			name: reqName,
			votes: 1,
		})
		res.sendStatus(201)
		sendNames()
		// Save the names
		saveNames()
	})
})

// Add vote
app.delete('/names/:nameId', (req, res)=>{
	// Validate request
	const { name } = req
	if (!req.name){
		log.warn("Invalid request to delete name not found")
		res.sendStatus(404)
		return
	}
	names = names.filter(n => n.id != name.id)
	log.debug(`Removed name ${name.name}`)
	res.sendStatus(204)
	sendNames()
	// Persist deletion
	database.deleteName(name.id)
})

// Fail over
app.get('*', (req, res)=>{
	res.sendFile(path.join(clientFolder, 'index.html'))
})

// Start up
const port = process.env.PORT || 5000
server.listen(port)

log.info(`Listing on port ${port}`)
