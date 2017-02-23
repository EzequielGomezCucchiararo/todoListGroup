const express = require('express')
const router = express.Router()
const fileName = '../src/data/tasks.json'
const fs = require('fs')

let tasks = require('../src/data/tasks.json')

router.get('/:id', (req, res) => {
  let id = req.params.id
  tasks = tasks.filter(elem => elem.id !== id)
  fs.writeFile(fileName, JSON.stringify(tasks, null, 2), function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
})

module.exports = router
