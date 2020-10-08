const express = require('express')
const router = express.Router()
const houseHelper = require('../services/house')


router.post('/', houseDetails)
router.put('/', createNewHouse)
router.patch('/', editHouse)
router.delete('/', deleteHouse)
router.post('/nearby', getNearbyHouses)
router.post('/polygonSearch', polygonSearch)
router.post('/search', filterSearch)



async function houseDetails(req, res) {
    try {
        if (req.body.id == undefined || !req.body.id) {
            return res.status(400).json({ message: "Incomplete data." })
        }
        let result = await houseHelper.houseDetails(req.body.id)
        return res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(503).send('There was an error')
    }
}
async function createNewHouse(req, res) {
    try {
        let area = req.body.area;
        let latitude = req.body.latitude;
        let longitude = req.body.longitude;
        let rent = req.body.rent;
        let mortgage = req.body.mortgage;
        let age = req.body.age;
        if (area == undefined || !area ||
            latitude == undefined || !latitude ||
            longitude == undefined || !longitude ||
            rent == undefined || !rent ||
            mortgage == undefined || !mortgage ||
            age == undefined || !age) {
            return res.status(400).json({ message: "Incomplete data.", body: req.body })
        }
        let result = await houseHelper.createNewHouse(area, latitude, longitude, rent, mortgage, age)
        return res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(503).send('There was an error')
    }
}
async function editHouse(req, res) {
    try {
        let id = req.body.id;
        let area = req.body.area;
        let latitude = req.body.latitude;
        let longitude = req.body.longitude;
        let rent = req.body.rent;
        let mortgage = req.body.mortgage;
        let age = req.body.age;
        if (id == undefined || !id) {
            return res.status(400).json({ message: "No house was picked." })
        }

        let result = await houseHelper.editHouse(id, area, latitude, longitude, rent, mortgage, age)
        return res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(503).send('There was an error')
    }
}
async function deleteHouse(req, res) {
    try {
        if (req.body.id == undefined || !req.body.id) {
            returnres.status(400).json({ message: "Incomplete data." })
        }
        let result = await houseHelper.deleteHouse(req.body.id)
        res.status(200).send('Deleted')
    } catch (error) {
        console.log(error)
        res.status(503).send('There was an error')
    }
}
async function getNearbyHouses(req, res) {
    try {
        if (req.body.latitude == undefined || req.body.longitude == undefined)
            return res.status(400).json({ message: "Incomplete data." })
        let result = await houseHelper.nearbyHousesWithin500m(req.body.latitude, req.body.longitude)
        return res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(503).send('There was an error')
    }
}
async function polygonSearch(req, res) {
    try {
        if (req.body.arrayOfLocations == undefined)
            return res.status(400).json({ message: "No data." })
        if (req.body.arrayOfLocations.length < 3)
            return res.status(400).json({ message: "You need to pick more cordinates." })

        let result = await houseHelper.polygonSearch(req.body.arrayOfLocations)
        return res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(503).send('There was an error')
    }
}
async function filterSearch(req, res) {
    try {
        let areaGte = req.body.areaGte;
        let areaLte = req.body.areaLte;
        let rentGte = req.body.rentGte;
        let rentLte = req.body.rentLte;
        let mortgageGte = req.body.mortgageGte;
        let mortgageLte = req.body.mortgageLte;
        let ageGte = req.body.ageGte;
        let ageLte = req.body.ageLte;
        let offset = req.body.offset || 0;

        let result = await houseHelper.filterSearch(areaGte, areaLte, rentGte, rentLte, mortgageGte, mortgageLte, ageGte, ageLte, offset)
        return res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(503).send('There was an error')
    }
}

module.exports = router