
"use client"

import { useRouter } from 'next/navigation';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';
import { Ricetta } from '@/model/ricetta'
import { removeRecipeDB, replaceUrl } from '@/utils/function'
import Link from 'next/link'
import React,{useState} from 'react'
import Image from 'next/image'
import { routes } from '@/utils/const';
type Props = {
  recipe: Ricetta;
}

export default function RecipeCard({recipe}: Props) {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);


  //
  const handleEdit = () => {
    router.push(`${routes.editRecipe}/${(recipe.id)}`);
  };

  // FUNZIONE PER L'ELIMINAZIONE DELLA RICETTA
  const handleDelete = () => {
    setShowDeleteDialog(true);

  };

  // FUNZIONE PER L'ELIMINAZIONE DELLA RICETTA
  const confirmDelete = () => {
    // Logica per l'eliminazione della ricetta
    setShowDeleteDialog(false);
    router.push('/'); // Redirect alla pagina principale o a una pagina di conferma
    removeRecipeDB(recipe);
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
  };

  return (
  

      <div className="relative bg-white rounded-lg shadow-md overflow-hidden">

        <div>
          <Link href={`${routes.recipeDetails}/${recipe.id}`}>
          <Image width={300} height={300} src={recipe.imageUrl} alt={recipe.titolo} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{recipe.titolo}</h2>
            <p className="text-lg font-semibold mb-2">{recipe.categoria}</p>
            <p className="text-lg font-semibold mb-2">{recipe.data}</p>
          </div>
          </Link>
        </div>


        {/* Menu open Edit and Delete buttons in basso a destra */}

        <div className="absolute top-4 right-4">

          <button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <RiPencilLine />
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            <RiDeleteBinLine />
          </button>
      </div>

      {showDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-30">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Conferma eliminazione</h2>
            <p className="text-lg mb-4">Sei sicuro di voler eliminare questa ricetta?</p>
            <div className="flex justify-end">
              <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                Elimina
              </button>
              <button onClick={cancelDelete} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}

</div>

  );
}