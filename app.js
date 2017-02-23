const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// ROUTES
const basicRoutes = require('./routes/routes-basics')
const addRoutes = require('./routes/routes-add')
const deleteRoutes = require('./routes/routes-delete')
const completedRoutes = require('./routes/routes-completed')

app.set('view engine', 'pug')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', basicRoutes)
app.use('/add', addRoutes)
app.use('/delete', deleteRoutes)
app.use('/completed', completedRoutes)

app.listen(3000, () => console.log('Listening ont PORT 3000'))

