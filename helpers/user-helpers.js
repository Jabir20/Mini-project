var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
const {ObjectId} = require('mongodb')
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
    searchPlaces: () => {
        return new Promise(async (resolve, reject) => {
            locations = await db.get().collection(collection.LOCATIONS).find({}, { projection: { Name: 1} }).toArray();
            resolve(locations)
        })
    },
    viewLocation:(locId)=>{
        return new Promise(async(resolve,reject)=>{
            details = await db.get().collection(collection.LOCATIONS).findOne({_id:new ObjectId(locId)})
            // console.log(details);
            resolve(details)
        })
    }

}