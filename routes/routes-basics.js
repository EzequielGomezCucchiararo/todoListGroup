const express = require('express')
const router = express.Router()
const fileName = '../src/data/tasks.json'
const fs = require('fs')

let tasks = require('../src/data/tasks.json')

router.get('/', (req, res) => {
  const title = 'Tasks List'
  let counter = 0
  let auxTasks = tasks.filter(elem => {
    return !elem.completionDate
  })
  res.render('index', {title, auxTasks, counter})
})

router.get('/completedAll', (req, res) => {
  tasks.map(task => {
    task.completionDate = 'Completed on ' + new Date()
  })
  fs.writeFile(fileName, JSON.stringify(tasks, null, 2), function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
})

module.exports = router
