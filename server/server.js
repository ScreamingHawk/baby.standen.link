const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const log = require('winston')

const app = express()

const clientFolder = path.join(__dirname, '..', 'client/build')

let names = [
	{
		id: 1,
		name: "Michael",
		votes: 5,
	}
]

// Accept json
app.use(bodyParser.json())

// Serve static files
app.use(express.static(clientFolder))

// Returns names
app.get('/names', (req, res)=>{
	res.json(names)
})

// Add name
app.post('/names', (req, res)=>{
	for (let i = 0; i < names.length; i++){
		const name = names[i]
		if (name.name === req.body.name){
			log.debug(`Attempt to submit name ${name.name} already supplied`)
			// Already in the list, that's ok
			res.sendStatus(204)
			return
		}
	}
	names.push({
		id: names.length,
		name: req.body.name,
		votes: 1,
	})
	res.sendStatus(201)
})

// Fail over
app.get('*', (req, res)=>{
	res.sendFile(path.join(clientFolder, 'index.html'))
})

// Start up
const port = process.env.PORT || 5000
app.listen(port)

log.info(`Listing on port ${port}`)
