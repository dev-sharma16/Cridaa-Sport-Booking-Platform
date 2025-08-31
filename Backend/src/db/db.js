const mongoose = require("mongoose");

function connectDb() {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to Db");
    })
    .catch((error)=>{
        console.log("Error in connecting Db : ",error);
    })
}

module.exports = connectDb;
