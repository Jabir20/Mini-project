var db = require('../config/connection')
var collection = require('../config/collections')
const {ObjectId} = require('mongodb')
const { response } = require('../app')

module.exports = {
    addProduct: (places, callback) => {
        db.get().collection(collection.LOCATIONS).insertOne(places).then((data) => {
            callback(data.insertedId)
        })
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
    }
}