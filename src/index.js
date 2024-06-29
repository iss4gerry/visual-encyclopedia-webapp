const express = require('express')
const app = express()
const path = require('path')
const router = require('./routes/index')

const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ limit:'10mb', extended: true }))
app.use(express.json({ limit:'10mb' }))

app.listen(5000, () => {
    console.log('Server running on localhost:5000')
})

app.use(router) 

app.get('/', (req, res) => {
    res.render('index.ejs')
})
