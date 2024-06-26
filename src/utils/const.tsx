import { Ricetta } from "@/model/ricetta";
import { faHouse,faAdd,faMessage,faBowlFood } from "@fortawesome/free-solid-svg-icons";


export const LoginCredentials = {
  email: 'cristianspastry@gmail.com',
  password: 'Cristianspastry2024',
}

// Categorie 
export const Categories = ['Seleziona', 'Ricette Base', 'Lievitati', 'Torte', 'Dolci Da Forno', 'Biscotti', 'Dolci Veloci']
// Difficolta
export const Difficulty = ['Seleziona', 'Molto Facile', 'Facile', 'Media', 'Difficile', 'Molto Difficile']
// Unita di misura di tempo
export const TimeUnity = ['Seleziona', 'sec', 'min', 'ore', 'giorni']
// Quantita di misura 
export const QuantityType = ['Seleziona', 'g', 'ml', 'Kg', 'q.b.', 'L', 'cucchiani', 'pizzico', 'pizzichi']

// routes
export const routes = {
  home: '/',
  ricette : '/recipes',
  addRecipe: '/addrecipe',
  editRecipe: '/editrecipe',
  recipeDetails : '/recipedetails',
  uploadImg: '/uploadimg',
  messaggi : '/messages',
  login :  '/login',
}

// Navigation links
export const navBarLinks = [
  { href: routes.home, title: 'Home', icon: faHouse },
  { href: routes.ricette, title: 'Ricette', icon: faBowlFood, },
  { href: routes.addRecipe, title: 'Aggiugni Ricetta', icon: faAdd },
  { href: routes.uploadImg, title: 'Aggiugni Immagine', icon: faAdd },
  { href: routes.messaggi, title: 'Messaggi', icon: faMessage },
]

// Formattare una ricetta in modo che sia leggibile
export const formatRecipe = (recipe: Ricetta) => {
  return {
    id: recipe.id,
    titolo: recipe.titolo,
    categoria: recipe.categoria,
    descrizione: recipe.descrizione,
    imageUrl: recipe.imageUrl,
    tempoDiPreparazione: {
      tempo: recipe.tempoDiPreparazione.tempo,
      tipoTempo: recipe.tempoDiPreparazione.tipoTempo
    },
    difficolta: recipe.difficolta,
    ingredienti: recipe.ingredienti,
    passaggi: recipe.passaggi,
    note: recipe.note,
    data: recipe.data,
  }
}

// db path
export const dbPath = 'recipes/'

// db url
export const dbURL = 'https://cristianspastry-default-rtdb.europe-west1.firebasedatabase.app/'


// Ottenere la data corrente
const currentDate = new Date();

// Ottenere giorno, mese e anno
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // I mesi partono da 0, quindi aggiungi 1
const year = currentDate.getFullYear();

// Formattare la data nel formato richiesto (DD/MM/YY)
export const formattedDate = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year.toString().slice(-2);



