const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = 'mongodb://tuomas:<password>@ds261755.mlab.com:61755/fullstack2018'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (process.argv.length == 4) {
    const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
    })

    person
        .save()
        .then(response => {
            console.log("person saved")
            console.log(person)
            mongoose.connection.close()
        })
} else {
    Person
        .find({})
        .then(result => {
            console.log("puhelinluettelo:")
            result.forEach(person => {
                console.log(person.name + ' ' + person.number)
            })
            mongoose.connection.close()
        })
}