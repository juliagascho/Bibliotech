import { Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";

// Layout principal do app com navbar fixa
// páginas com navbar fixa: home, livros, empréstimos, etc
export function Root() {
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