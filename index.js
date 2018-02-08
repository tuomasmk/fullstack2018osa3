const express = require ('express')

const app = express()

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

app.get('/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if ( person ) {
        res.json(person)
    } else {
        res.status(404).end()
    }
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