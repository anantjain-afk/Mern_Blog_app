const mongoose = require("mongoose");
// in mongoose we have to create a schema first and then we will create a model based on that schema .
// schema is basically a structure of our document (like a blueprint) and model is a representation of that schema which we will use to interact with the database .
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required'] //this means username is a required field and if it's not provided then it will show the error message 'Username is required'
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true // this means email should be unique for each user
    },
    password:{
        type:String,
        required:[true,'Password is required']
    }

},{timestamps:true} )// this will add createdAt and updatedAt fields to our document automatically)


const UserModel = mongoose.model('Users',userSchema); // here 'Users' is the name of the collection in the database and userSchema is the schema we created above .

module.exports = UserModel;


