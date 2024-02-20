const mongoose = require('mongoose');

const mongoURI= "mongodb://localhost:27017/inotebook"

const connectToMongo =  async ()=>{
    mongoose.connect(mongoURI, await console.log(" 2222 connected to mongo sucessfully")

    )
    

}
module.exports= connectToMongo