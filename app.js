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
  const title = 'Tasks List'
  res.render('index', {title, tasks})
})

app.post('/', (req, res) => {
  let bodyTask = req.body.bodyTask
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()
  let h = addZero(date.getHours())
  let m = addZero(date.getMinutes())
  let newTask = {
    id: '' + (tasks.length ? (+tasks[tasks.length - 1].id + 1) : 1),
    body: bodyTask,
    creationDate: `Created on ${day} / ${month + 1} / ${year} at ${h}:${m}`,
    completionDate: ''
  }
  tasks.push(newTask)
  fs.writeFile(fileName, JSON.stringify(tasks, null, 2), function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
})

// DELETE
app.get('/delete/:id', (req, res) => {
  let id = req.params.id
  tasks = tasks.filter(elem => elem.id !== id)
  fs.writeFile(fileName, JSON.stringify(tasks, null, 2), function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
})

// COMPLETED
app.get('/completed/:id', (req, res) => {
  let id = req.params.id
  tasks.map(task => {
    if (task.id === id) task.completionDate = 'Completed on ' + new Date()
  })
  fs.writeFile(fileName, JSON.stringify(tasks, null, 2), function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
})

// TASK COMPLETED METHODS
app.get('/completed', (req, res) => {
  const title = 'Task Completed'
  res.render('completed', {title, tasks})
})

app.listen(3000, () => console.log('Listening ont PORT 3000'))

function addZero (i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}
