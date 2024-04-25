"use client"
import { useAuth } from "../components/AuthContext/authContext";
// Home
 
export default function Home() {
  const {logout} = useAuth();
  return (  
    <>
     <main className="flex min-h-screen p-24 justify-between">
  <h1 className="text-3xl font-bold ">Dashboard</h1>
  <button onClick={() => logout()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-auto h-9 ">
    Logout
  </button>
</main>



  </>
  );
}


/*

    <div className="p-6">
    <h1 className="text-3xl font-bold mb-12">Ricette</h1>
   
    <SearchBar />
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe: Ricetta) => (
        <RecipeCard key={recipe.titolo} recipe={recipe} />
      ))}
        
    </div>
    
    {error && <p className="text-red-500 mt-6">{error}</p>}
  </div>*/