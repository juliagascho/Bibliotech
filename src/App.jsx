import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { auth } from "./firebase/config";
import { AdicionarEmprestimo } from "./pages/AdicionarEmprestimo/AdicionarEmprestimo";
import { AdicionarLivro } from "./pages/AdicionarLivro/AdicionarLivro";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { EditarLivro } from "./pages/EditarLivro/EditarLivro";
import { Emprestimos } from "./pages/Emprestimos/Emprestimos";
import { Home } from "./pages/Home/Home";
import { Livros } from "./pages/Livros/Livros";
import { Login } from "./pages/Login/Login";
import { Root } from "./pages/Root/Root";

export function App() {

    const [ usuarioLogado, setUsuarioLogado ] = useState(null);

    useEffect(() => {
        // monitorar/detectar o usuário conectado
        // fica sabendo quando loga/desloga
        onAuthStateChanged(auth, (user) => {
            // user é nulo = deslogado
            // user tem objeto = logado
            setUsuarioLogado(user);
        })
        // esse efeito irá rodas aenas uma vez quando o app for renderizado
    }, [])

    return (
        <>
        {/* a informação de usuario logado ou não vai ser repassada para todas as rotas: */}
            <AuthContext.Provider value={usuarioLogado}> 
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Root />}>
                            <Route path="/" element={<Home />} /> 
                            <Route path="/livros" element={<Livros />} /> 
                            <Route path="/livros/adicionar" element={<AdicionarLivro />} />  
                            <Route path="/livros/editar/:id" element={<EditarLivro />} />    
                            <Route path="/emprestimos/adicionar" element={<AdicionarEmprestimo />} /> 
                            <Route path="/emprestimos" element={<Emprestimos />} /> 

                        </Route>
                        <Route path="/login" element={<Login />} /> 
                        <Route path="/cadastro" element={<Cadastro />} /> 
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
            <Toaster />
        </>
    );
}