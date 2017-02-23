const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Tasks List')
})

app.get('/completed', (req, res) => {
  res.send('Tasks completed')
})

app.listen(3000, () => console.log('Listening ont PORT 3000'))
