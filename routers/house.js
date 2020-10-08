const express = require('express')
const router = express.Router()
const houseHelper = require('../services/house')

router.post('/nearby', getNearbyHouses)



async function getNearbyHouses(req, res) {
    try {
        if(req.body.latitude == undefined || req.body.longitude ==undefined)
            res.status(400).JSON({message: "Incomplete data."})
        let result = await houseHelper.nearbyHousesWithin500m(req.body.latitude, req.body.longitude)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports = router