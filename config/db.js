const mongoose = require("mongoose");
const config = require("config");
const db = config.get('mongoURl');

const connectDB = async () => {
    try{
       await mongoose.connect(db, {
           useNewUrlParser : true
       });
       console.log('mongoDB Caonnected');
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB;