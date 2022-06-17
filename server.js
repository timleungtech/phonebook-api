const express = require('express')
const app = express()
const PORT = 3001
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

app.use(express.json())
let db,
    DB_STRING = process.env.DB_STRING,
    dbName = 'phonebook',
    personsCollection

MongoClient.connect(DB_STRING, { useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName)
        personsCollection = db.collection('persons')
        console.log(`Connected to ${dbName} Database`)
})

let persons = [
    { 
      "_id": 0,
      "name": "unknown", 
      "number": "000-000-0000"
    },
    { 
      "_id": 1,
      "name": "Sally Smith", 
      "number": "111-111-1111"
    },
    { 
      "_id": 2,
      "name": "Joe Johnson", 
      "number": "222-222-2222"
    },
    { 
      "_id": 3,
      "name": "Wayne Williams", 
      "number": "333-333-3333"
    },
    { 
      "_id": 4,
      "name": "Bobby Brown", 
      "number": "444-444-4444"
    },
    { 
      "_id": 5,
      "name": "Grace Garcia", 
      "number": "555-555-5555"
    }  
]

app.listen(process.env.PORT || PORT, () => {
    console.log('Listening on env port or PORT')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    })

app.get('/api/persons/', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:_id', (req, res) => {
    const personId = req.params._id
    if ( persons[personId] ){
        res.json(persons[personId])
    } else {
        // res.json(persons[0])
        return res.status(400).json({ 
                "_id": 'unknown',
                "name": "unknown", 
                "number": "000-000-0000"
        })
    }
})

// app.post('/api/addPerson', (req, res) => {
//     collection('persons').insertOne({id: req.body.id, name: req.body.name})
//     .then(result => {
//         console.log('New Person Added')
//         res.redirect('/')
//     })
//     .catch(error => console.error(error))
// })