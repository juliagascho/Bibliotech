import { addDoc, getDocs } from "firebase/firestore";
import { livrosCollection } from "./collections";

export async function addLivro(data) {
    await addDoc(livrosCollection, data);
}

export async function getLivros() {
    const snapshot = await getDocs(livrosCollection);
    let livros = []; // cada livro que trouxer da cosulta vai pra esse array
    snapshot.forEach(doc => {
        livros.push({...doc.data(), id: doc.id}); // doc.data converte o documento em um livro
    })
    return livros;
}

// toda função assíncrona precisa ter await antes dela