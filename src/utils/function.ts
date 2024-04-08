import { Dispatch, SetStateAction } from "react";

import { Ricetta } from "@/model/ricetta";
import { database, storage } from "@/app/firebase";
import { child, get, ref, remove, set, update } from "firebase/database";
import { getDownloadURL, uploadBytes, ref as storageRef } from "firebase/storage";
import { dbPath } from "./const";



// function to add recipe
export function addRecipetoDB(Recipe: any) {
  set(ref(database, dbPath + Recipe.id), Recipe);
}

// funciot to delete recipe
export function removeRecipeDB(Recipe: Ricetta) {
  remove(ref(database, dbPath + Recipe.id),);
}

// function to update recipe
export function updateRecipeDB(Recipe: Ricetta) {
  update(ref(database, dbPath + Recipe.id), Recipe);
}

// function to get recipe
export function getRecipesDB(setRecipe: any, setError: Dispatch<SetStateAction<string>>) {
  get(child(ref(database), dbPath)).then((snapshot) => {
    if (snapshot.exists()) {
      const recipeData = snapshot.val();
      setRecipe!(Object.values(recipeData));
    } else {
      setError!("Errore durante il recupero dei dati :(");
      console.error("Errore durante il recupero dei dati");
    }
  }).catch((error) => {
    setError!(error);
    console.error(error);
  });
}

// funcion to get recipe by id
export async function getRecipeById(id: string, setRecipe: Dispatch<SetStateAction<Ricetta|null>>, setError: Dispatch<SetStateAction<string[]>>) {
  try {
    const snapshot = await get(child(ref(database), dbPath + id));
    if (snapshot.exists()) {
      const recipeData = snapshot.val() as Ricetta;
      setRecipe(recipeData);
    } else {
      setError(["Ricetta non trovata"]);
    }
  } catch (error) {
    setError(error as string[]);
    console.error(error);
  }
}

// function to upload image
export const upLoadImage = (
  category: string,
  imageName: File,
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  const StorageRef = storageRef(storage, `img_ricette/${category}/${imageName.name}`);
  uploadBytes(StorageRef, imageName)
    .then((snapshot) => {
      console.log('Immagine caricata con successo');
      console.log(snapshot.ref.fullPath);
      onSuccess();
    })
    .catch((error) => {
      console.error('Errore durante il caricamento dell\'immagine:', error);
      onError(error.message);
    });
};


// is valid image
export const isValidImageUrl = (url: string) => {
  return (
    (url.startsWith('http://') || url.startsWith('https://')) && 
    (url.match(/\.(jpeg|jpg|gif|png)$/) !== null) 
  );
};




// create markup
export const createMarkup = (content: any) => {
  return { __html: content };
};

// normalize string
export function normalizeString(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '');
}

// replace space
export const replaceUrl = (url: string) => {
  return url.replace(/\s+/g, '');
}
