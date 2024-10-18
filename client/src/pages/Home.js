import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]); // Initialize as empty array
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3001/receipes");
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch(`http://localhost:3001/receipes/savedRecipes/ids/${userID}`);
        const data = await response.json();
        setSavedRecipes(data.savedRecipes || []); // Ensure savedRecipes is an array
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await fetch("http://localhost:3001/receipes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeID,
          userID,
        }),
      });

      const data = await response.json();

      // Update savedRecipes state
      setSavedRecipes((prevSavedRecipes) => {
        if (!prevSavedRecipes.includes(recipeID)) {
          return [...prevSavedRecipes, recipeID];
        }
        return prevSavedRecipes; // Return existing state if recipeID is already saved
      });
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => Array.isArray(savedRecipes) && savedRecipes.includes(id); // Check if savedRecipes is an array

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            
              
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
