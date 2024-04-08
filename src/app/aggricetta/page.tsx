"use client"
import AddRecipeForm from "@/components/form/addRecipeForm/addRecipeForm";
import {useEffect,} from "react";




export default function AggRicetta() {

  useEffect(() => {
  
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Aggiungi Ricetta</h1>
      <AddRecipeForm/>

    </main>
  );
}
