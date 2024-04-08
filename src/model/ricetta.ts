

// model ricetta
  
 export interface Ricetta {
    id: string;
    titolo: string;
    categoria: string;
    descrizione: string;
    imageUrl: string;
    tempoDiPreparazione: {
      tempo: string;
      tipoTempo: string;
    };
    difficolta: string;
    ingredienti: {
        titoloGruppo: string;
        ingredienti: {
          quantita: string;
          tipoQuantita: string;
          nome: string;
        }[];
      }[];
    passaggi: string[];
    note: string;
    data : number | string;
  }