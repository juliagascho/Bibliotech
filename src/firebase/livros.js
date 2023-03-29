import { addDoc, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
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

export async function getLivro(id) {
    const document = await getDoc(doc(livrosCollection, id));
    return{...document.data(), id: document.id}
}

export async function updateLivro(id, novoLivro) {
    await updateDoc(doc(livrosCollection, id), novoLivro)
}
//updatedoc atualiza o valor

export async function deleteLivro(id) {
    await deleteDoc(doc(livrosCollection, id))
}