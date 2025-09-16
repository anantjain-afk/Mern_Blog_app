const mongooes = require("mongoose");

const connectDB = async () =>{
    try{
        await mongooes.connect(process.env.MONGO_URL.replace("<db_password>",process.env.ATLAS_PASSWORD));
        console.log("MONGO DB CONNECTED".bgGreen.white);
    }catch(error){
        console.log(`MONGO Connect Error : ${error.message}`.bgRed.white);
    }
}

module.exports = connectDB ; 
