"use client"
import { useEffect, useState } from 'react';
import { createMarkup, getRecipeById, } from '@/utils/function';
import { Ricetta } from '@/model/ricetta';
import Image from 'next/image';

export default function RecipeDetails({ params }: { params: { slug: string } }) {
  const [recipe, setRecipe] = useState<Ricetta | null>(null);
  const [error, setError] = useState<string[]>(['']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {

        await getRecipeById(params.slug, setRecipe, setError); // Attendiamo l'esecuzione della funzione senza assegnare il risultato a fetchedRecipe
      } catch (error) {
        setError(['Error fetching recipe']);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Caricamento in corso...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Ricetta non trovata</p>
      </div>
    );
  }


  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{recipe.titolo}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Image src={recipe.imageUrl} alt={recipe.titolo} className="w-full h-auto mb-4" width={200} height={200}/>
          <div className="mb-4">
            <p><span className="font-bold">Categoria:</span> {recipe.categoria}</p>
            <p><span className="font-bold">Descrizione:</span> <span dangerouslySetInnerHTML={createMarkup(recipe.descrizione)}></span></p>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <p><span className="font-bold">Tempo di preparazione:</span> {recipe.tempoDiPreparazione.tempo} {recipe.tempoDiPreparazione.tipoTempo}</p>
            <p><span className="font-bold">Difficoltà:</span> {recipe.difficolta}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Ingredienti:</h2>
            <ul>
              {recipe.ingredienti.map((gruppo, index) => (
                <li key={index}>
                  <p className="font-bold mb-2">{gruppo.titoloGruppo}</p>
                  <ul>
                    {gruppo.ingredienti.map((ingrediente, i) => (
                      <li key={i} className="list-disc ml-4">{ingrediente.quantita} {ingrediente.tipoQuantita} {ingrediente.nome}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Passaggi:</h2>
            <ol>
              {recipe.passaggi.map((passaggio, index) => (
                <li key={index} dangerouslySetInnerHTML={createMarkup(passaggio)} className="list-decimal ml-4"></li>
              ))}
            </ol>
          </div>
          {recipe.note && <p><span className="font-bold">Note:</span> {recipe.note}</p>}
          <p><span className="font-bold">Data:</span> {recipe.data}</p>
        </div>
      </div>
      {
        error && <p className="text-red-500 mt-6">{error}</p>
      }
    </div>
   
  );
}
