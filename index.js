const express = require ('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    res.send('<div>puhelinluettelossa ' + persons.length + ' henkilön tiedot</div>'
    + '<div>' + Date() + '</div>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if ( person ) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({error: 'name or number missing'})
    } else if (persons.filter(p => p.name === body.name).length > 0) {
        return res.status(400).json({error: 'name must be unique'})
    }

    const thisId =  Math.ceil(Math.random() * 65535)
    const person = {
        name: body.name,
        number: body.number,
        id: thisId
    }
    
    persons = persons.concat(person)

    console.log(person)

    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
})

const date = () => {
    Date()
}

let persons = [
    {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
    },
    {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
    },
    {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
    },
    {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
    }
]