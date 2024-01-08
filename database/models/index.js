import mongoose from "mongoose";
import { Schema, model, models } from 'mongoose';


const userSchema = new mongoose.Schema({
name : {
    type:String,
    required:[true,"please provide email"],
    unique:true
},

email:{
    type: String,
    required:[true,"Please provide email"],
    unique:[true, "Email already exits"]
},
password:{
    type:String,
    required:[true,"Please provide a password"],
},
dept:{
    type:String,
    required:true
},
level:{
    type:String
},
semester:{
    type:String
},
matno:{
    type:String
},
courses:{
    type:Array,
    default:[]
},
phoneNo:{
    type:Number,
},
isVerified: {
    type: Boolean,
    default:false,
},
forgotPasswordToken :String,
forgotPasswordTokenExpiry : Date,
verifyToken: String,
verifyTokenExpiry: Date
})

const User = mongoose.models.User || mongoose.model("User",userSchema)

export default User;