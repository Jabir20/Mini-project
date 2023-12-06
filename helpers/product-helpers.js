var db = require('../config/connection')
var collection = require('../config/collections')
const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')
const { response } = require('../app')

module.exports = {
    // addProduct: (places, callback) => {
    //     db.get().collection(collection.LOCATIONS).insertOne(places).then((data) => {
    //         callback(data.insertedId)
    //     })
    // },
    addProduct: (locationData, callback) => {
        const formattedLocationData = {
            "Name": locationData.Name,
            "About": locationData.About,
            "Description": locationData.Description,
            "Cuisine": locationData.Cuisine,
            "Activities": {
                "Clear": [locationData.ClearActivity1, locationData.ClearActivity2, locationData.ClearActivity3],
                "Rainy": [locationData.RainyActivity1, locationData.RainyActivity2, locationData.RainyActivity3],
                "Windy": [locationData.WindyActivity1, locationData.WindyActivity2, locationData.WindyActivity3]
            }
        };
        db.get().collection(collection.LOCATIONS).insertOne(formattedLocationData)
            .then((data) => {
                callback(data.insertedId);
            })
            .catch((error) => {
                console.error('Error inserting location data:', error);
                callback(null, error);
            });
    },
    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            let places = await db.get().collection(collection.LOCATIONS).find().toArray();
            resolve(places)
        })
    },
    deleteLocation: (locationId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.LOCATIONS).deleteOne({ _id: new ObjectId(locationId) }).then((response) => {
                resolve(response)
            })
        })
    },
    getProduct: (locationId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.LOCATIONS).findOne({ _id: new ObjectId(locationId) }).then((response) => {
                resolve(response)
            })
        })
    },
    updateLocation: (locationId, details) => {
        return new Promise((resolve, reject) => {
            // console.log(locationId);
            // console.log(details);

            const formattedLocationData = {
                "Name": details.Name,
                "About": details.About,
                "Description": details.Description,
                "Cuisine": details.Cuisine,
                "Activities": {
                    "Clear": [details.ClearActivity1, details.ClearActivity2, details.ClearActivity3],
                    "Rainy": [details.RainyActivity1, details.RainyActivity2, details.RainyActivity3],
                    "Windy": [details.WindyActivity1, details.WindyActivity2, details.WindyActivity3]
                    // Add more activities as needed
                }
            };

            db.get().collection(collection.LOCATIONS)
                .updateOne({ _id: new ObjectId(locationId) }, { $set: formattedLocationData })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    console.error('Error updating location data:', error);
                    reject(error);
                });
        });
    },
    getAllFeedbacks: () => {
        return new Promise(async (resolve, reject) => {
            let feedbacks = await db.get().collection(collection.FEEDBACK).find().toArray();
            resolve(feedbacks)
        })
    },
    getAllSuggestions: () => {
        return new Promise(async (resolve, reject) => {
            let suggestions = await db.get().collection(collection.SUGGESTION).find().toArray();
            resolve(suggestions)
        })
    },
    doLogin: (adminData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let admin = await db.get().collection(collection.ADMIN).findOne({ Email: adminData.Email })
            if (admin) {
                bcrypt.compare(adminData.Password, admin.Password).then((status) => {
                    if (status) {
                        console.log("Success");
                        response.admin = admin
                        response.status = true
                        resolve(response)
                    } else {
                        console.log("failed");
                        resolve({ status: false })
                    }
                })
            } else {
                console.log("Admin Not Found");
                resolve({ status: false })
            }
        })
    },
}
