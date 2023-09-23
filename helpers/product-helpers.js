var db = require('../config/connection')

// we are going to create all functions in the module.exorts
module.exports={

    addProduct:(product,callback)=>{
        // console.log(product)

        db.get().collection('product').insertOne(product).then((data)=>{
            // console.log(product._id)    //both product._id and data.insertedId returns same value
            callback(data.insertedId)
        })
    }

} 