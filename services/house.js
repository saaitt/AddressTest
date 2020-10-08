const db = require('../models')
const { Op } = db.Sequelize


async function houseDetails(id) {
    let house = await db.House.findOne({
        where: {
            id: id
        }
    })
    return house
}
async function createNewHouse(area, latitude, longitude, rent, mortgage, age) {
    let house = await db.House.create({
        area: area,
        latitude: latitude,
        longitude: longitude,
        rent: rent,
        mortgage: mortgage,
        age: age
    })
    return house
}
async function editHouse(id, area, latitude, longitude, rent, mortgage, age) {
    let house = await db.House.findOne({
        where: {
            id: id
        }
    })
    if (house == undefined || !house) {
        throw { message: "House not found" }
    } else {
        if ((area != undefined || area))
            house.area = area

        if ((latitude != undefined || latitude))
            house.latitude = latitude

        if ((longitude != undefined || longitude))
            house.longitude = longitude

        if ((rent != undefined || rent))
            house.rent = rent

        if ((mortgage != undefined || mortgage))
            house.mortgage = mortgage

        if ((age != undefined || age))
            house.age = age

        await house.save();
        return house
    }
}
async function deleteHouse(id) {
    let house = await db.House.findOne({
        where: {
            id: id
        }
    })
    if (house.length == 0) {
        throw { message: "House not found" }
    } else {
        await house.destroy()
    }
}
async function nearbyHousesWithin500m(latitude, longitude) {
    let houses = await db.sequelize.query(` SELECT  id, age, rent, latitude, longitude, mortgage 
            FROM "Houses"  
            WHERE ST_DWithin(ST_MakePoint(longitude, latitude)::geography,ST_MakePoint(:requestLongitude, :requestLatitude)::geography, 500,false) IS TRUE
            LIMIT 10;`, {
        replacements: {
            requestLongitude: longitude,
            requestLatitude: latitude
        },
        type: db.Sequelize.QueryTypes.SELECT
    })
    return houses
}
async function polygonSearch(arrayOfLocations) {
    let polygonQuery = await makePolygonQuery(arrayOfLocations)
    let query = `SELECT  id, age, rent, latitude, longitude, mortgage 
                    FROM "Houses"  
                    WHERE ST_Contains(` + polygonQuery + `,ST_MakePoint(longitude, latitude)) IS TRUE`
    let houses = await db.sequelize.query(query, {
        type: db.Sequelize.QueryTypes.SELECT
    })
    return houses
}
async function makePolygonQuery(arrayOfLocations) {
    let polygonLocations = arrayOfLocations
    polygonLocations.push(polygonLocations[0])
    let ArrayOfPoints = 'ARRAY['
    for (let i = 0; i < polygonLocations.length; i++) {
        let point = 'ST_MakePoint(' + polygonLocations[i].longitude + ',' + polygonLocations[i].latitude + ')'
        if (i < polygonLocations.length - 1)
            ArrayOfPoints = ArrayOfPoints.concat(point, ",")
        else
            ArrayOfPoints = ArrayOfPoints.concat(point, "]")
    }
    let query = `ST_MakePolygon(ST_MakeLine(` + ArrayOfPoints + `))`
    return query
}
async function filterSearch(areaGte, areaLte, rentGte, rentLte, mortgageGte, mortgageLte, ageGte, ageLte, offset) {
    let where = {};
    if (areaGte)
        where.area = { [Op.gte]: areaGte }
    if (areaLte)
        where.area = { [Op.lte]: areaLte }
    if (rentGte)
        where.rent = { [Op.gte]: rentGte }
    if (rentLte)
        where.rent = { [Op.lte]: rentLte }
    if (mortgageGte)
        where.mortgage = { [Op.gte]: mortgageGte }
    if (mortgageLte)
        where.mortgage = { [Op.lte]: mortgageLte }
    if (ageGte)
        where.mortgage = { [Op.lte]: mortgageLte }
    if (ageLte)
        where.mortgage = { [Op.gte]: mortgageGte }

    let houses = await db.House.findAll({ where: where, offset: offset, limit: 25 })
    return houses
}
module.exports.nearbyHousesWithin500m = nearbyHousesWithin500m
module.exports.polygonSearch = polygonSearch
module.exports.houseDetails = houseDetails
module.exports.createNewHouse = createNewHouse
module.exports.editHouse = editHouse
module.exports.deleteHouse = deleteHouse
module.exports.filterSearch = filterSearch