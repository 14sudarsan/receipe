import mongoose from "mongoose";

//creating a model hre we work for login system
const Userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,

    },
    savedReceipes:[{
        type:mongoose.Schema.Types.ObjectId,ref:"receipes"
    }],
   
});

//export every model into routes
//export the usermodel
export const UserModel = mongoose.model("users",Userschema);