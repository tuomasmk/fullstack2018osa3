const mongoose = require('mongoose')

if( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

const url = process.env.MONGODB_URI

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.statics.testing = function() {
  console.log('Does this get called?  ')
}

//personSchema.statics.format = function (person) {
  personSchema.static('format', function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  };
})

const Person = mongoose.model('Person', personSchema);

module.exports = Person