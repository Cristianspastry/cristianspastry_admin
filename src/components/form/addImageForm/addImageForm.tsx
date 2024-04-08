
"use state"

import { Categories } from '@/utils/const';
import { upLoadImage } from '@/utils/function';
import React, { useState } from 'react'

type Props = {}

function AddImageForm({}: Props) {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [category, setCategory] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Logica per l'upload dell'immagine qui

        if (selectedImage && category) {
            console.log('Immagine selezionata:', selectedImage);

            upLoadImage(category, selectedImage, () => {
                setShowSuccessModal(true);
            }, setError);
        } else {
            console.error('Nessuna immagine selezionata o categoria specificata');
            setError('Nessuna immagine selezionata o categoria specificata');
        }
    };


  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Carica un&apos; immagine</h2>
    <div className="mb-4">
        <label htmlFor="imageInput" className="block text-gray-700 font-semibold mb-2">Seleziona un&apos; immagine:</label>
        <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="categoryInput" className="block text-gray-700 font-semibold mb-2">Seleziona una categoria:</label>
        <select id="categoryInput" className="border border-gray-300 rounded-md px-4 py-2 w-full" required={true} value={category} onChange={(e) => setCategory(e.target.value)}>
            {Categories.map((category) => (
                <option key={category} value={category}>{category}</option>
            ))}
        </select>
    </div>
    
    {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white w-1/3 p-6 rounded-md shadow-md">
                <p className="text-green-500 mb-4">Immagine caricata con successo!</p>
                <button
                    onClick={() => setShowSuccessModal(false)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                >
                    {"OK :) "}
                </button>
            </div>
        </div>
    )}

    <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
    >
        Carica
    </button>

</form>
  )
}

export default AddImageForm