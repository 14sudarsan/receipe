import mongoose from "mongoose";

//creating a model hre we work for login system
const Receipeschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
       
    },
    ingredients:[{
        type:String,
        required:true,

    }],
    instructions:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true,
    },

    cookingTime:{
        type:Number,
        required:true
    },
    userOwner:{
        type:mongoose.Schema.Types.ObjectId, ref:"users",required:true,
    }
});

//export every model into routes
//export the usermodel
export const ReceipeModel = mongoose.model("receipes",Receipeschema);