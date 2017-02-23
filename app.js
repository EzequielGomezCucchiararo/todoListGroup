const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const fileName = './src/data/tasks.json'

app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'pug')

let tasks = require('./src/data/tasks.json')

// TASK LIST METHODS
app.get('/', (req, res) => {
  const title = 'This is the layout from home'
  res.render('index', {title, tasks})
})

app.post('/', (req, res) => {
  let bodyTask = req.body.bodyTask
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()
  let newTask = {
    id: tasks.length + 1,
    body: bodyTask,
    creationDate: `${day} / ${month + 1} / ${year}`,
    completionDate: '',
    completed: 'false'
  }
  tasks.push(newTask)
  fs.writeFile(fileName, JSON.stringify(tasks, null, 2), function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
})

// TASK COMPLETED METHODS
app.get('/completed', (req, res) => {
  const title = 'This is the layout from completed'
  res.render('completed', {title})
})

app.listen(3000, () => console.log('Listening ont PORT 3000'))
