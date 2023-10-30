var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')
const { log } = require('handlebars')

module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.Password = await bcrypt.hash(userData.Password, 10)
            db.get().collection(collection.USER).insertOne(userData).then((data) => {
                resolve(data)
            })
        })
    },
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.USER).findOne({ Email: userData.Email })
            if (user) {
                bcrypt.compare(userData.Password, user.Password).then((status) => {
                    if (status) {
                        console.log("Success");
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log("failed");
                        resolve({ status: false })
                    }
                })
            } else {
                console.log("User Not Found");
                resolve({ status: false })
            }
        })
    },
    getThreeProducts: () => {
        return new Promise(async (resolve, reject) => {
            let places = await db.get().collection(collection.LOCATIONS).find().limit(3).toArray();
            resolve(places)
        })
    },
    searchPlaces: () => {
        return new Promise(async (resolve, reject) => {
            locations = await db.get().collection(collection.LOCATIONS).find({}, { projection: { Name: 1 } }).toArray();
            resolve(locations)
        })
    },
    viewLocation: (locId) => {
        return new Promise(async (resolve, reject) => {
            details = await db.get().collection(collection.LOCATIONS).findOne({ _id: new ObjectId(locId) })
            // console.log(details);
            resolve(details)
        })
    },
    checkWeather: (locName) => {
        const apiKey = "65c7cf2933d703385c935e271566f6b7";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        let weatherInfo
        return new Promise(async (resolve, reject) => {
            const response = await fetch(apiUrl + locName + `&appid=${apiKey}`);

            if (response.status == 404) {
                return { error: 'City not found' };
            } else {
                const data = await response.json();
                // console.log(data);
                weatherInfo = {
                    city: data.name,
                    temp: Math.round(data.main.temp) + "°C",
                    humidity: data.main.humidity + "%",
                    wind: data.wind.speed + "km/hr",
                };
                if (data.weather[0].main == "Clouds") {
                    weatherInfo.icon = "clouds.png";
                } else if (data.weather[0].main == "Clear") {
                    weatherInfo.icon = "clear.png";
                } else if (data.weather[0].main == "Rain") {
                    weatherInfo.icon = "rain.png";
                } else if (data.weather[0].main == "Drizzle") {
                    weatherInfo.icon = "drizzle.png";
                } else if (data.weather[0].main == "Snow") {
                    weatherInfo.icon = "snow.png";
                } else if (data.weather[0].main == "Mist") {
                    weatherInfo.icon = "mist.png";
                }
                // console.log(weatherInfo);

            }
            resolve(weatherInfo)
        })
    }

}