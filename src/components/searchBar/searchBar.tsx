import React, { useEffect, useState } from 'react';
import { getRecipesDB } from '@/utils/function';
import { Ricetta } from '@/model/ricetta';
import Link from 'next/link';
import { routes } from '@/utils/const';



type Props = {};

const SearchBar: React.FC<Props> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [recipes, setRecipes] = useState<Ricetta[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Ricetta[]>([]);

  useEffect(() => {
    // Carica le ricette dal database quando il componente viene montato
    getRecipesDB(setRecipes, setError);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Filtra le ricette in base al termine di ricerca
    const filtered = recipes.filter((recipe) =>
      recipe.titolo.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Pulisce il campo di input di ricerca
    setSearchTerm('');
  };

  return (
    <>
      {/* Search bar */}
      <form onSubmit={handleSubmit} className="m-3">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Cerca..."
          className=" rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-r-md px-4 py-2">Cerca</button>

        {/* Modal per le ricette filtrate */}
        {searchTerm && (
          <div className="absolute z-10 bg-white w-28 shadow-md mt-2 rounded">
            <ul className="p-4">
              {filteredRecipes.map((recipe) => (
                <li key={recipe.id}>
                  <Link href={`${routes.recipeDetails}/${recipe.id}`}>
                    {recipe.titolo}
                    </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </>
  );
};

export default SearchBar;
