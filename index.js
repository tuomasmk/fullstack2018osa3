const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(morgan(':method :url :showData :status :res[content-length] - :response-time ms'))
morgan.token('showData', function(req, res) { return JSON.stringify(req.body)})

app.use(bodyParser.json())
app.use(morgan('showData'))

app.use(cors())
app.use(express.static('build'))

app.get('/info', (req, res) => {
    Person
        .find({})
        .then(people => {
            res.send('<div>puhelinluettelossa ' + people.length 
                + ' henkilön tiedot</div>'
                + '<div>' + Date() + '</div>')
        })
        .catch(error => {
            console.log(error)
        })
})

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(people => {
            res.json(people.map(Person.format))
        })
        .catch(error => {
            console.log(error)
            res.status(404).end()
        })
})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(Person.format(person))
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id'})
        })
})

app.delete('/api/persons/:id', (req, res) => {
    Person
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(errot => {
            res.status(400).send({ error: "malformatted id" })
        })
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log('name ' + body.name + ', number ' + body.number)
    if (body.name === undefined || body.number === undefined ||
        body.name === '' || body.number === '') {
        return res.status(400).json({error: 'name or number missing'})
    }
    Person
        .find({name: body.name})
        .then(result => {
            if(result.length > 0) {
                console.log(result)
                return res.status(400).json({error: 'name must be unique'})        
            } else {
                const person = new Person({
                    name: body.name,
                    number: body.number,
                })
                
                person
                    .save()
                    .then(savedPerson => {
                        res.json(Person.format(savedPerson))
                    })
                    .catch(error => {
                        console.log(error)
                    })
            
                console.log(person)
            }
        })
})

app.put('/api/persons/:id', (req, res) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person
        .findByIdAndUpdate(req.params.id, person, { new: true} )
        .then(updatedPerson => {
            res.json(Person.format(updatedPerson))
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
})

const date = () => {
    Date()
}

let persons = []
  