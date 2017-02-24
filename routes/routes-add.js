const express = require('express')
const newFormatedDate = require('../src/js/newFormatedDate.js')
const fs = require('fs')
const router = express.Router()
const fileName = './src/data/tasks.json'

let tasks = require('../src/data/tasks.json')

router.post('/', addNewTask)

module.exports = router

// FUNCTIONS DECLARATION
function addNewTask (req, res) {
  let bodyTask = req.body.bodyTask

  let newTask = {
    id: '' + (tasks.length ? (+tasks[tasks.length - 1].id + 1) : 1),
    body: bodyTask,
    creationDate: 'Created on ' + newFormatedDate(),
    completionDate: ''
  }
  tasks.push(newTask)
  fs.writeFile(fileName, JSON.stringify(tasks, null, 2), function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
}
