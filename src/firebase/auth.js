
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./config";

// função assíncrona == o resultado não é obtido de imediato
// haverá espera 
export async function cadastrarEmailSenha(email, senha) {
    // indicar para o firebase que queremos cadastrar um novo usuário utilizando email/senha

    // aguardando o resultado do firebase
    const resultado = await createUserWithEmailAndPassword(auth, email, senha);

    return resultado.user
}

export async function loginGoogle() {
    // configurar como o login do google vai funcionar
    const provider = new GoogleAuthProvider();
    const resultado = await signInWithPopup(auth, provider);

    return resultado.user;
}

export async function loginEmailSenha(email, senha) {
    // vai realizar login com conta já existente
    const resultado = await signInWithEmailAndPassword(auth, email, senha);

    return resultado.user;
}

export async function logout() {
    // Deslogar o usuário atual do firebase:
    await signOut(auth);
}

// quando os valores estão em um banco de dados, para capturar estes valores é necessário usar essa estrutura
// async -> chamada para o firebase
// auth vem do config, todas as funções precisam para funcionar e redirecionar pro firebase
