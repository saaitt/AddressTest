const db = require('../models')



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
module.exports.nearbyHousesWithin500m = nearbyHousesWithin500m
module.exports.polygonSearch = polygonSearch