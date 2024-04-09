




import EditRecipeForm from '@/components/form/editRecipeForm/editRecipeForm'
import React from 'react'

type Props = {}

function EditRecipe({params}: {params: {slug: string}}) {
  return (
   <>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Modifica Ricetta</h1>
      <EditRecipeForm params={params}/>

    </main>
   </>
  )
}

export default EditRecipe