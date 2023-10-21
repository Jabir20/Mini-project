var db=require('../config/connection')
var collection = require('../config/collections')

module.exports={
    addProduct:(places,callback)=>{
        db.get().collection(collection.LOCATIONS).insertOne(places).then((data)=>{
            callback(data.insertedId)
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let places = await db.get().collection(collection.LOCATIONS).find().toArray();
            resolve(places)
        })
    }
}