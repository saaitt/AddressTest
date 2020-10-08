const express = require('express')
const router = express.Router()
const houseHelper = require('../services/house')

router.post('/nearby', getNearbyHouses)
router.post('/polygonSearch', polygonSearch)

async function getNearbyHouses(req, res) {
    try {
        if (req.body.latitude == undefined || req.body.longitude == undefined)
            res.status(400).JSON({ message: "Incomplete data." })
        let result = await houseHelper.nearbyHousesWithin500m(req.body.latitude, req.body.longitude)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}
async function polygonSearch(req, res) {
    try {
        if (req.body.arrayOfLocations == undefined)
            res.status(400).JSON({ message: "No data." })
        if (req.body.arrayOfLocations.length < 3)
            res.status(400).JSON({ message: "You need to pick more cordinates." })

        let result = await houseHelper.polygonSearch(req.body.arrayOfLocations)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}
module.exports = router