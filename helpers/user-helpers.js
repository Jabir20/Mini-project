var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')
const { log } = require('handlebars')

module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            const existingUser = await db.get().collection(collection.USER).findOne({ Email: userData.Email });
            if (existingUser) {
                // If the email exists, reject the signup with an error message
                reject('Email ID already exists.');
            }else{
                userData.Password = await bcrypt.hash(userData.Password, 10)
                db.get().collection(collection.USER).insertOne(userData).then((data) => {
                    resolve(data)
                })
            }
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
            let places = await db.get().collection(collection.LOCATIONS).find().limit(6).toArray();
            resolve(places)
        })
    },
    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            let places = await db.get().collection(collection.LOCATIONS).find().toArray();
            resolve(places)
        })
    },
    searchPlaces: () => {
        return new Promise(async (resolve, reject) => {
            locations = await db.get().collection(collection.LOCATIONS).find({}, { projection: { Name: 1 } }).toArray();
            resolve(locations)
        })
    },
    searchPlaces2: () => {
        return new Promise(async (resolve, reject) => {
            locations = await db.get().collection(collection.LOCATIONS).find({}, { projection: { Name: 1, Description: 1 } }).toArray();
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
    checkWeather: (locName, res) => {
        const apiKey = "65c7cf2933d703385c935e271566f6b7";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

        return new Promise(async (resolve, reject) => {
            const response = await fetch(apiUrl + locName + `&appid=${apiKey}`);

            if (response.status === 404) {
                // Location not found
                res.status(404).json({ error: 'Location not found' });
            } else {
                const data = await response.json();
                let weatherInfo = {};

                if (data.cod === '404') {
                    // Location not found
                    res.status(404).json({ error: 'Location not found' });
                } else {
                    weatherInfo = {
                        city: data.name,
                        temp: Math.round(data.main.temp) + "°C",
                        humidity: data.main.humidity + "%",
                        wind: data.wind.speed + "km/hr",
                        weather: data.weather[0].main,
                    };

                    switch (data.weather[0].main) {
                        case "Clouds":
                            weatherInfo.icon = "clouds.png";
                            break;
                        case "Clear":
                            weatherInfo.icon = "clear.png";
                            break;
                        case "Rain":
                            weatherInfo.icon = "rain.png";
                            break;
                        case "Drizzle":
                            weatherInfo.icon = "drizzle.png";
                            break;
                        case "Snow":
                            weatherInfo.icon = "snow.png";
                            break;
                        case "Mist":
                            weatherInfo.icon = "mist.png";
                            break;
                        default:
                            // Handle other weather conditions
                            break;
                    }
                }

                resolve(weatherInfo);
            }
        });
    }
    ,
    storeFeedback: (user, feedback) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.FEEDBACK).insertOne({ user, feedback }).then((data) => {
                resolve(data)
            })
        })
    },
    storeSuggestion: (user, location, suggestion) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.SUGGESTION).insertOne({ user, location, suggestion }).then((data) => {
                resolve(data)
            })
        })
    }

}



// api.openweathermap.org/data/2.5/forecast?id={city ID}&appid={API key}