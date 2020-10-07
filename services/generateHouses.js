const randomLocation = require('random-location')
const cliProgress = require('cli-progress');
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const db = require('../models')


saveRandomHouses();

async function generateHouse() {
    let randomHouses = [];
    let randomHouse = {
        area: 0,
        latitude: 0.0,
        longitude: 0.0,
        rent: 0,
        mortgage: 0,
        age: 0
    };
    const centeralTeharanPoint = { // a location in center of Tehran
        latitude: 35.706770,
        longitude: 51.380023
    }
    const Radius = 10000 // meters
    for (let i = 0; i < 2000; i++) {
        randomPoint = randomLocation.randomCirclePoint(centeralTeharanPoint, Radius)
        randomHouse = {
            area: parseInt(Math.random() * 100),
            latitude: randomPoint.latitude,
            longitude: randomPoint.longitude,
            rent: parseInt(Math.random() * 50) * 100,
            mortgage: parseInt(Math.random() * 300) * 1000,
            age: parseInt(Math.random() * 20)
        }
        randomHouses.push(randomHouse)
    }
    return randomHouses
    // console.log(randomHouses)
}
async function saveRandomHouses() {
    let allHouses = [];
    progressBar.start(1000, 0);
    for (let i = 1; i <= 1000; i++) {
        await db.House.bulkCreate(await generateHouse(), {})
        // allHouses.push(db.House.bulkCreate(await generateHouse(), {}));
        progressBar.update(i);
    }
    // await Promise.all(allHouses);
    progressBar.stop();
}