const express = require('express')
const newFormatedDate = require('../src/js/newFormatedDate.js')
const router = express.Router()
const fileName = './src/data/tasks.json'
const fs = require('fs')

let tasks = require('../src/data/tasks.json')

router.get('/', (req, res) => {
  const title = 'Task Completed'
  let counter = 0
  let auxTasks = tasks.filter(elem => {
    return elem.completionDate
  })
  res.render('completed', {title, auxTasks, counter})
})

router.get('/:id', (req, res) => {
  let id = req.params.id
  tasks.map(task => {
    if (task.id === id) task.completionDate = 'Completed on ' + newFormatedDate()
  })
  fs.writeFile(fileName, JSON.stringify(tasks, null, 2), function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
})

router.get('/delete/:id', (req, res) => {
  let id = req.params.id
  tasks = tasks.filter(elem => elem.id !== id)
  fs.writeFile(fileName, JSON.stringify(tasks, null, 2), function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/completed')
})

module.exports = router
