const {
	Pool,
} = require('pg')

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

clearDatabase = () => {
	// Clear
	pool.connect((err, client, done) => {
		checkErr(err)
		client.query('DROP TABLE IF EXISTS baby_names', (err, res) => {
			checkErr(err)
			log.info('Dropped baby_names table')
			done()
		})
	})
}

createDatabase = () => {
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
					done()
				})
			} else {
				done()
			}
		})
	})
}

module.exports = {
	createDatabase,
	clearDatabase,
}
