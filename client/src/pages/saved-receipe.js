import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        console.log(`Fetching saved recipes for user ID: ${userID}`);
        
        // Fetch saved recipe IDs
        const response = await fetch(`http://localhost:3001/receipes/savedRecipes/ids/${userID}`);

        if (!response.ok) {
          throw new Error("Failed to fetch saved recipe IDs");
        }

        const { savedRecipes: recipeIDs } = await response.json();
        console.log("Fetched saved recipe IDs:", recipeIDs);

        // Fetch full recipe details based on IDs
        if (recipeIDs && recipeIDs.length > 0) {
          const recipesResponse = await fetch(`http://localhost:3001/receipes/savedRecipes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ recipeIDs }), // Send recipeIDs in the body to fetch the full recipes
          });

          if (!recipesResponse.ok) {
            throw new Error("Failed to fetch saved recipes");
          }

          const recipesData = await recipesResponse.json();
          setSavedRecipes(recipesData.savedRecipes);
        } 
      } catch (err) {
        console.error(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <p>{recipe.description}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
