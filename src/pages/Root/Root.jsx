import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";
import { AuthContext } from "../../contexts/AuthContext";

// Layout principal do app com navbar fixa
// páginas com navbar fixa: home, livros, empréstimos, etc
export function Root() {

    const usuarioLogado = useContext(AuthContext);
    // temos duas rotas publicas: login e cadastro
    //mas nas outras rotas precisa estar logado para entrar
    // com esse if todas as rotas que estiverem no root estarão protegidas
    if(usuarioLogado === null) {
        // se está deslogado, redireciona para a pagina de login
        return <Navigate to="/login" />
    }

    return (
        <>
            <header>
                <Menu />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}