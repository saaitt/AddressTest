const express = require('express')
const { route } = require('./house')
const router = express.Router()

const HouseRouters = require('./house')

router.use('/houses', HouseRouters)

module.exports = router