var db = require('../config/connection')
var collection = require('../config/collections')
const {ObjectId} = require('mongodb')
const bcrypt = require('bcrypt')
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
    },
    getProduct:(locationId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.LOCATIONS).findOne({_id: new ObjectId(locationId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    updateLocation:(locationId,details)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.LOCATIONS)
            .updateOne({_id:new ObjectId(locationId)},{
                $set:{
                    Name:details.Name,
                    Description:details.Description,
                    Attraction:details.Attraction,
                    Cuisine:details.Cuisine,
                    Activity:details.Activity
                }
            }).then((response)=>{
                resolve(response)
            })
        })
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
