import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//import  usermodel from models
import { UserModel } from "../models/Users.js";

//here 1,2,3 are the required modules
//here router is considered as app
const router = express.Router();

router.use(express.json())
//registerapi created successfully
router.post("/register",async(req,res)=>{
    const {username,password}= req.body;

    const user = await UserModel.findOne({username});

    

    if (user){
        return res.json({message:"user already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = new UserModel({username,password:hashedPassword});

    await newUser.save();

    res.json({message:"user registered successfully"})
});
//login api
router.post("/login",async(req,res)=>{

    const {username,password}= req.body;
    //here usermodel is db so that for login we check the username present in db or not
    const user = await UserModel.findOne({username});

    if(!user){
        return res.json({message:"user does not exists"});
    }
    
    //if the user is already exist then we have to check the password matches or not,,but here 
    //here we hashed the password for their privacy


    //comparing the client pw with already exist password
    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.json({message:"user does not exists"});
    }

    const token = jwt.sign({id:user._id},"secret");
    res.json({token,userID:user._id});
//login api also done

    
})


//export every routes to server that is here index.js
export {router as userRouter};