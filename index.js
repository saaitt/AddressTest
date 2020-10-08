const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const HOST = '0.0.0.0';

const api = require('./routers')
// const api = require('./routers')

// app.use('/api', api
app.use(bodyParser.json())



app.use('/api', api)


app.listen(port, HOST, () => console.log(`Example app listening at http://localhost:${port}`))