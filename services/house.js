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

module.exports.nearbyHousesWithin500m = nearbyHousesWithin500m