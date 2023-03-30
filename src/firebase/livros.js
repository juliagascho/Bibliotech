import { addDoc, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { livrosCollection } from "./collections";
import { storage } from "./config"

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

export async function uploadCapaLivro(imagem){
    const filename = imagem.name;
    const imageRef = ref(storage, `livros/${filename}`); //objeto de referencia que o storage entende, para ser usado como base
    const result = await uploadBytes(imageRef, imagem); // passo o imageref e a imagem = endereço e arquivo
    return await getDownloadURL(result.ref);
}