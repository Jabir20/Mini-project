const mongoClient = require('mongodb').MongoClient
const state ={
    db:null
}
module.exports.connection=function(done){
    const url = 'mongodb://localhost:27017'
    const dbname = 'shopping'

    mongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db = data.db(dbname)
    })
}