"use client"

import RecipeCard from "@/components/card/recipeCard";
import SearchBar from "@/components/searchBar/searchBar";
import { Ricetta } from "@/model/ricetta";
import { getRecipesDB } from "@/utils/function";
import { useEffect, useState } from "react";

// Home
 
export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
 
  useEffect(() => {
    // Chiamata a getRecipeDB all'interno di useEffect per garantire che venga eseguita dopo il render iniziale
    getRecipesDB(setRecipes, setError);
  }, []) // L'array vuoto come dipendenza assicura che l'effetto venga eseguito solo una volta, dopo il primo render
 
  return (  
    <>
    {/* Main content */}
    <div className="p-6">
    <h1 className="text-3xl font-bold mb-12">Ricette</h1>
    {/* Search bar */}
    <SearchBar />
    {/* Recipe cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe: Ricetta) => (
        <RecipeCard key={recipe.titolo} recipe={recipe} />
      ))}
        
    </div>
    {/* Error message */}
    {error && <p className="text-red-500 mt-6">{error}</p>}
  </div>
  </>
  );
}
