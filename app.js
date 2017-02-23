const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  const title = 'This is the layout from home'
  res.render('layout', {title})
})

app.get('/completed', (req, res) => {
  const title = 'This is the layout from completed'
  res.render('layout', {title})
})

app.listen(3000, () => console.log('Listening ont PORT 3000'))
