const express = require('express')
const morgan = require('morgan');
const app = express()
app.use(express.json())
app.use(morgan('tiny'));
const cors = require('cors')

app.use(cors())

let persons = [
    {
      id: "1",
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: "2",
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: "3",
      name: "Dan Abramov",
      number: "12-44-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
      }
  ]
  
  app.get('/info', (request, response)=>{
    const maxId = persons.length
    response.send('Phonebook has info for ' + maxId + ' persons' + '<br/>' + 
      Date().toString())
    response.send()
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  function getRandomInt(min,max){
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return String(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled));
    
  }
  app.post('/api/persons', (request, response) => {
    
    const body = request.body
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (!body.number) {
      return response.status(400).json({
        error: 'number missing'
      })
    }
    
    const person = {
      id: getRandomInt(11,78965),
      name: body.name,
      number:body.number,
    }
    const personCur = persons.find(person => person.name === body.name)
    if (!personCur)
    persons = persons.concat(person)
    else if (personCur)
    return response.status(400).json({
  error: ' name must be unique'})  

    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


  
  
  