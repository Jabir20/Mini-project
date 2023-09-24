var db = require('../config/connection')
var collection = require('../config/collection')
// we are going to create all functions in the module.exorts
module.exports={
      
    // Fn to add products to DB
    addProduct:(product,callback)=>{
        // console.log(product)

        db.get().collection('product').insertOne(product).then((data)=>{
            // console.log(product._id)    //both product._id and data.insertedId returns same value
            callback(data.insertedId)
        })
    },
    // Fn to retrieve all the datas from the database and to display it on web page (For admin page)
    getAllProduct:()=>{
        return new Promise(async(resolve,reject)=>{
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    }


} 