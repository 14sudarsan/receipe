import express, { json } from "express"
import mongoose from "mongoose";

import { ReceipeModel } from "../models/Receipes.js";
import { UserModel } from "../models/Users.js";


const router = express.Router();

router.get("/",async (req,res) =>{
    try{

        const response = await ReceipeModel.find({});

        res.json(response)

        

    }catch(error){
        res.json(error)

    }
})

router.post("/",async (req,res)=>{
    const receipe = new ReceipeModel(req.body);

    try{
        const response = await receipe.save()
        res.json(response)
    }catch(error){
        res.json(error)
    }
})
router.put("/", async (req, res) => {
  try {
    const { recipeID, userID } = req.body;
    console.log("Received request to save recipe", { recipeID, userID });

    // Ensure the recipeID is valid and the recipe exists
    const recipe = await ReceipeModel.findById(recipeID);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    console.log("Found recipe:", recipe._id);

    // Ensure the user exists
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("Found user:", user._id);

    // Initialize savedRecipes if undefined
    if (!user.savedRecipes) {
      user.savedRecipes = [];
    }

    // Avoid saving duplicate recipes
    const isRecipeAlreadySaved = user.savedRecipes.some(
      (savedRecipe) => savedRecipe.toString() === recipe._id.toString()
    );
    if (isRecipeAlreadySaved) {
      console.log("Recipe already saved, skipping:", recipe._id);
      return res.json({ savedRecipes: user.savedRecipes, message: "Recipe already saved" });
    }

    // Save the recipe to the user's savedRecipes array
    console.log("Saving recipe to user savedRecipes array");
    user.savedRecipes.push(recipe._id);
    await user.save();
    console.log("Saved recipe, updated savedRecipes:", user.savedRecipes);

    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
});

  
  // Get the saved recipes IDs for a user
  // Fetch saved recipe IDs for a user
router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userID);
      res.json({ savedRecipes: user?.savedRecipes || [] });
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // Get the full saved recipes details based on saved recipe IDs
  router.post("/savedRecipes", async (req, res) => {
    try {
      // Ensure recipeIDs are passed correctly
      const { recipeIDs } = req.body; // Use recipeIDs from the body
      const savedRecipes = await ReceipeModel.find({
        _id: { $in: recipeIDs }, // Match the recipe IDs
      });
      res.json({ savedRecipes });
    } catch (error) {
      res.status(500).json(error);
    }
  });
 
  
  
export {router as receipeRouter};



