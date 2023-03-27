import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// chaves de acesso a firebase
const firebaseConfig = {
  apiKey: "AIzaSyBz3sESeBrHotYtpdtc88aqfFyPBjt4Klk",
  authDomain: "bibliotech-aulas-ju.firebaseapp.com",
  projectId: "bibliotech-aulas-ju",
  storageBucket: "bibliotech-aulas-ju.appspot.com",
  messagingSenderId: "210019651061",
  appId: "1:210019651061:web:fa872c1ec5bd122d4024bc"
};

// inicializa o app com base nas configurações acima:
export const app = initializeApp(firebaseConfig);
// configurando o authentication e seus recursos login/cadastro:
export const auth = getAuth(app);
// configura o Firestore e seus recursos de banco de dados:
export const db = getFirestore(app);
// configura o Storage e seus recursos de upload:
export const storage = getStorage(app);

