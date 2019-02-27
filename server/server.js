const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const log = require('./logger')
const database = require('./database')

const app = express()

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

// Returns names
app.get('/names', (req, res)=>{
	res.json(names)
})

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
	// Persist deletion
	database.deleteName(name.id)
})

// Fail over
app.get('*', (req, res)=>{
	res.sendFile(path.join(clientFolder, 'index.html'))
})

// Start up
const port = process.env.PORT || 5000
app.listen(port)

log.info(`Listing on port ${port}`)
