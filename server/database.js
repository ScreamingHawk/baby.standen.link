const {
	Pool,
} = require('pg')
const async = require('async')

const log = require('./logger')

const connectionString = process.env.DATABASE_URL || 'postgresql://baby:baby@localhost/baby'

const pool = new Pool({
	connectionString: connectionString,
	//ssl: true,
})

checkErr = (err) => {
	if (err){
		log.error(err)
		throw err
	}
}

callThese = (done, next) => {
	if (done){
		done()
	}
	if (next){
		next()
	}
}

clearDatabase = (next) => {
	// Clear
	pool.connect((err, client, done) => {
		checkErr(err)
		client.query('DROP TABLE IF EXISTS baby_names', (err, res) => {
			checkErr(err)
			log.info('Dropped baby_names table')
			callThese(done, next)
		})
	})
}

createDatabase = (next) => {
	// Check and upgrade database
	pool.connect((err, client, done) => {
		checkErr(err)
		client.query('SELECT count(table_name) FROM information_schema.tables WHERE table_name = \'baby_names\'', (err, res) => {
			checkErr(err)
			if (res.rows[0].count === "0"){
				// Create missing table
				client.query('CREATE TABLE baby_names (\
					id           INT PRIMARY KEY,\
					name         VARCHAR(20),\
					votes        INT\
				);', (err, res)=> {
					checkErr(err)
					log.info('Created baby_names table')
					callThese(done, next)
				})
			} else {
				callThese(done, next)
			}
		})
	})
}

saveNames = (names, next) => {
	// Store names
	pool.connect((err, client, done) => {
		checkErr(err)
		async.forEach(names, (name, callback)=>{
			client.query({
				text: 'INSERT INTO baby_names (id, name, votes)\
					VALUES ($1, $2, $3)\
					ON CONFLICT (id) DO UPDATE\
						SET name = $2, votes = $3',
				values: [name.id, name.name, name.votes]
			}, (err, res) => {
				callback(err)
			})
		}, err => {
			checkErr(err)
			callThese(done, next)
		})
	})
}

loadNames = (next) => {
	// Store names
	pool.connect((err, client, done) => {
		checkErr(err)
		client.query('SELECT * FROM baby_names', (err, res) => {
			checkErr(err)
			done()
			next(err, res.rows)
		})
	})
}

module.exports = {
	createDatabase,
	clearDatabase,
	saveNames,
	loadNames,
}
