import React from 'react'
import AddRecipeForm from "@/components/form/addRecipeForm/addRecipeForm";




const AddRecipe =  () => {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Aggiungi Ricetta</h1>
      <AddRecipeForm/>

    </main>
  );
}

export default AddRecipe;