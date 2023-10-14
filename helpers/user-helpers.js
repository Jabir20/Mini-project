var db = require('../config/connection')
var collection = require('../config/collection')
const { response } = require('../app')
const bcrypt = require('bcrypt')
module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.Password = await bcrypt.hash(userData.Password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((response) => {
                resolve(response.insertedId)
                // to show based on condition
                // -------------------------------------------------------------------------------------------------------------------------
                // const Id = response.insertedId
                // db.get().collection(collection.USER_COLLECTION).findOne({_id:Id}).then((findResponse)=>{
                //     resolve(findResponse)
                // })
            })
        })
    },

    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ Email: userData.Email })
            if (user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log("Login Succes");
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("Login failed");
                        resolve({status:false})
                    }
                })
            }else{
                console.log("Login Failed Don't exist");
                resolve({status:false})
            }
        })
    }
}