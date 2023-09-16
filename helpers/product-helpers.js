var db = require('../config/connection')

// we are going to create all functions in the module.exorts
module.exports={

    addProduct:(product,callback)=>{
        console.log(product)

        db.get().collection('product').insertOne(product).then((data)=>{
            callback(true)
        })
    }

} 