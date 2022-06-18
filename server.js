const express = require('express')
const app = express()
const PORT = 3001
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

//set EJS as template engine to generate HTML
app.set('view engine', 'ejs')
//urlencoded method tells express to extract data from form and add to body property of request object (req.body)
app.use(express.urlencoded({ extended: true }))
//express's JSON middleware to allow server to accept/read JSON data
app.use(express.json())
//express.static - middleware to make dir accessible to public
app.use(express.static('public'))

let db,
    DB_STRING = process.env.DB_STRING,
    dbName = 'phonebook'

MongoClient.connect(DB_STRING, { useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName)
        console.log(`Connected to ${dbName} Database`)

        app.listen(process.env.PORT || PORT, () => {
            console.log(`Listening on env port or ${PORT}`)
        })
      
        app.get('/', (req, res) => {
            db.collection('persons').find().toArray()
            .then(results => {
              let date = new Date()
              console.log(date + " GET '/' requested by " + req.hostname)
              res.render('index.ejs', {persons: results})
            })
            .catch(error => console.error(error))
        })

        app.get('/api/persons/', (req, res) => {
            db.collection('persons').find().toArray()
            .then(results => {
              res.json(results)
            })
            .catch(error => console.error(error))
        })

        // app.get('/api/persons/:_id', (req, res) => {
        //     const personId = req.params._id
        //     if ( persons[personId] ){
        //         res.json(persons[personId])
        //     } else {
        //         return res.status(400).json({ 
        //                 "_id": 'unknown',
        //                 "name": "unknown", 
        //                 "number": "000-000-0000"
        //         })
        //     }
        // })

        app.post('/api/addPerson', (req, res) => {
            db.collection('persons').insertOne({name: req.body.name, homeNumber: req.body.homeNumber})
              .then(results => {
                  let name = req.body.name
                  console.log(`${name} has been added to phonebook.`)
                  res.redirect('/')
              })
              .catch(error => console.error(error))
        })
    })