
"use client"

import React, { useEffect, useState } from 'react'
import { Categories, Difficulty, QuantityType, TimeUnity, formatRecipe, formattedDate, } from '@/utils/const'
import { Ricetta } from '@/model/ricetta'
import { ref, set } from 'firebase/database'
import { database } from '@/app/firebase'
import { addRecipetoDB, createMarkup,  isValidImageUrl } from '@/utils/function'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
type Props = {}

const AddRecipeForm = (props: Props) => {

  const [recipe, setRecipe] = useState<Ricetta>({
    id: uuidv4(),
    titolo: '',
    categoria: '',
    descrizione: ``,
    imageUrl: '',
    tempoDiPreparazione: { tempo: '', tipoTempo: '' },
    difficolta: '',
    ingredienti: [{ titoloGruppo: '', ingredienti: [{ quantita: '', tipoQuantita: '', nome: '' }] }],
    passaggi: [''],
    note: '',
    data : formattedDate,
  });
  
  const [errors, setErrors] = useState<string[]>([]);
  
  const router = useRouter();

  const handleStepChange = (index: number, value: string) => {
    const newPassaggi: string[] = [...recipe.passaggi];
    newPassaggi[index] = value;
    setRecipe({ ...recipe, passaggi: newPassaggi });
  };

  const handleRemoveStep = (index: number) => {
    const newPassaggi = [...recipe.passaggi];
    newPassaggi.splice(index, 1);
    setRecipe({ ...recipe, passaggi: newPassaggi });
  };

  const handleAddStep = () => {
    const newPassaggi = [...recipe.passaggi, ''];
    setRecipe({ ...recipe, passaggi: newPassaggi });
  };

  const handleAddIngredientGroup = () => {
    const newIngredienti = [...recipe.ingredienti, { titoloGruppo: '', ingredienti: [{ quantita: '', tipoQuantita: '', nome: '' }] }];
    setRecipe({ ...recipe, ingredienti: newIngredienti });
  };

  const handleRemoveIngredientGroup = (index: number) => {
    const newIngredienti = [...recipe.ingredienti];
    newIngredienti.splice(index, 1);
    setRecipe({ ...recipe, ingredienti: newIngredienti });
  };

  const handleAddIngredient = (gruppoIndex: number) => {
    const newIngredienti = [...recipe.ingredienti];
    newIngredienti[gruppoIndex].ingredienti.push({ quantita: '', tipoQuantita: '', nome: '' });
    setRecipe({ ...recipe, ingredienti: newIngredienti });
  };

  const handleRemoveIngredient = (gruppoIndex: number, ingredienteIndex: number) => {
    const newIngredienti = [...recipe.ingredienti];
    newIngredienti[gruppoIndex].ingredienti.splice(ingredienteIndex, 1);
    setRecipe({ ...recipe, ingredienti: newIngredienti });
  };

  const handleIngredientTitleChange = (gruppoIndex: number, value: string) => {
    const newIngredienti = [...recipe.ingredienti];
    newIngredienti[gruppoIndex].titoloGruppo = value;
    setRecipe({ ...recipe, ingredienti: newIngredienti });
  };

  const addRecipe = (e: React.FormEvent) => {
    e.preventDefault();


    if (!recipe.titolo || !recipe.categoria || !recipe.descrizione || !recipe.imageUrl || !recipe.difficolta || !recipe.tempoDiPreparazione.tempo || !recipe.tempoDiPreparazione.tipoTempo) {
      setErrors(['Assicurati di compilare tutti i campi obbligatori']);
      return;
    }

    // Validazione dell'URL dell'immagine
    /*if (!isValidImageUrl(recipe.imageUrl)) {
      setErrors(['L\'URL dell\'immagine non è valido']);
      return;
    }*/
    if (recipe) {
      addRecipetoDB(formatRecipe(recipe));
      console.log(formatRecipe(recipe));
      alert('Recetta aggiunta correttamente');

      router.push('/');
    }

  };

  return (
    <form onSubmit={addRecipe}>

      <div className="mb-4">
        <label htmlFor="Titolo Ricetta" className="block text-xl font-semibold mb-1">Titolo Ricetta</label>
        <input type="text" id="Titolo Ricetta" placeholder="Titolo Ricetta" value={recipe.titolo} onChange={e => setRecipe({ ...recipe, titolo: e.target.value })} className="w-full px-3 py-2 border rounded-md" />
      </div>

      <div className="mb-4">
        <label htmlFor="categoria" className="block text-xl font-semibold mb-1">
          Categoria
        </label>
        <select
          id="categoria"
          value={recipe.categoria}
          onChange={(e) => setRecipe({ ...recipe, categoria: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
        >
          {Categories.map((category, index) => <option key={index} value={category}>{category}</option>)}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="descrizione" className="block text-xl font-semibold mb-1">Descrizione</label>
        <ReactQuill id='descrizione' theme='snow' placeholder='descrizione' value={recipe.descrizione} onChange={value => setRecipe({ ...recipe, descrizione: value })} className='w-full px-3 py-2 border rounded-md' />
      </div>

      <div className="mb-4">
        <label htmlFor="imgUrl" className="block text-xl font-semibold mb-1">Immagine</label>
        <input type="url" id="imgUrl" placeholder="Url Immaggine" value={recipe.imageUrl} onChange={e => setRecipe({ ...recipe, imageUrl: e.target.value })} className="w-full px-3 py-2 border rounded-md" />
      </div>

      <div className="mb-4">
        <label htmlFor="difficolta" className="block text-xl font-semibold mb-1">Difficoltà</label>
        <select id="difficolta" value={recipe.difficolta} onChange={e => setRecipe({ ...recipe, difficolta: e.target.value })} className="w-full px-3 py-2 border rounded-md">
          {Difficulty.map((difficulty, index) => <option key={index} value={difficulty}>{difficulty}</option>)}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="tempoDiPreparazione" className="block text-xl font-semibold mb-1">Tempo di Preparazione</label>
        <div className="flex items-center">
          <input type="number" value={recipe.tempoDiPreparazione.tempo} onChange={e => setRecipe({ ...recipe, tempoDiPreparazione: { ...recipe.tempoDiPreparazione, tempo: e.target.value } })} className="w-1/3 px-3 py-2 border rounded-l-md m-2" />
          <select value={recipe.tempoDiPreparazione.tipoTempo} onChange={e => setRecipe({ ...recipe, tempoDiPreparazione: { ...recipe.tempoDiPreparazione, tipoTempo: e.target.value } })} className="px-3 py-2 border rounded-r-md">
            {TimeUnity.map((unity, index) => <option key={index} value={unity}>{unity}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xl font-semibold mb-1">Ingredienti</label>
        {recipe.ingredienti.map((gruppo, gruppoIndex) => (
          <div key={gruppoIndex} className="mb-4 p-4 border rounded-md">
            <input
              type="text"
              placeholder="Titolo Gruppo"
              value={gruppo.titoloGruppo}
              onChange={(e) => handleIngredientTitleChange(gruppoIndex, e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-2"
            />
            {gruppo.ingredienti.map((ingrediente, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="number"
                  placeholder="quantità"
                  value={ingrediente.quantita}
                  onChange={(e) => {
                    const newIngredienti = [...recipe.ingredienti];
                    newIngredienti[gruppoIndex].ingredienti[index].quantita = e.target.value;
                    setRecipe({ ...recipe, ingredienti: newIngredienti });
                  }}
                  className="w-1/4 px-3 py-2 border rounded-l-md mr-1"
                />


                <select value={ingrediente.tipoQuantita} onChange={(e) => {
                  const newIngredienti = [...recipe.ingredienti];
                  newIngredienti[gruppoIndex].ingredienti[index].tipoQuantita = e.target.value;
                  setRecipe({ ...recipe, ingredienti: newIngredienti });
                }} className="w-1/4 px-3 py-2 border rounded-l-md mr-1">
                  {QuantityType.map((type, index) => <option key={index} value={type}>{type}</option>)}
                </select>

                <input
                  type="text"
                  placeholder="Ingrediente"
                  value={ingrediente.nome}
                  onChange={(e) => {
                    const newIngredienti = [...recipe.ingredienti];
                    newIngredienti[gruppoIndex].ingredienti[index].nome = e.target.value;
                    setRecipe({ ...recipe, ingredienti: newIngredienti });
                  }}
                  className="w-1/4 px-3 py-2 border rounded-l-md mr-1"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(gruppoIndex, index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddIngredient(gruppoIndex)}
              className="px-3 py-2 bg-green-500 text-white rounded-md"
            >
              Aggiungi Ingrediente
            </button>
            <button
              type="button"
              onClick={() => handleRemoveIngredientGroup(gruppoIndex)}
              className="px-3 py-2 bg-red-500 text-white rounded-md ml-2"
            >
              Rimuovi Gruppo
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddIngredientGroup}
          className="px-3 py-2 bg-green-500 text-white rounded-md"
        >
          Aggiungi Gruppo
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-xl font-semibold mb-1">Passaggi</label>
        {recipe.passaggi.map((step, index) => (
          <div key={index} className="flex items-center mb-2">
            <ReactQuill value={step} onChange={value => handleStepChange(index, value)} className="w-full px-3 py-2 border rounded-md mr-2" />
            <button type="button" onClick={() => handleRemoveStep(index)} className="px-3 py-2 bg-red-500 text-white rounded-md">-</button>
          </div>
        ))}

        <button type="button" onClick={handleAddStep} className="px-3 py-2 bg-green-500 text-white rounded-md">Aggiungi Passaggio</button>
      </div>

      <div className="mb-4">
        <label htmlFor="note" className="block text-xl font-semibold mb-1">Note</label>
        <textarea id="note" placeholder="note" value={recipe.note} onChange={e => setRecipe({ ...recipe, note: e.target.value })} className="w-full px-3 py-2 border rounded-md"></textarea>
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Salva Ricetta</button>

      {errors.length > 0 && (
        <div className="mb-4 text-red-500">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

    </form>
  )
}

export default AddRecipeForm

