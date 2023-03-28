import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Menu/Loader/Loader";
import { getLivros } from "../../firebase/livros";

export function Livros() {
  const [livros, setLivros] = useState(null);

  useEffect(() => {
    //buscar info no bd
    // const busca = await getLivros();
    getLivros().then((busca) => {
      setLivros(busca);
    });
  }, []);

  // useEffect(async () => {
  //     const busca = await getLivros();
  //     setLivros(busca)
  //     // buscar informações do campo
  //   }, []);

  return (
    <div className="livros">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Livros</h1>
          <Button as={Link} to="/livros/adicionar" variant="success">
            Adicionar livros
          </Button>
        </div>
        <hr />
        {livros === null ? 
          <Loader />
         : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Categoria</th>
                <th>Capa</th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro) => {
                return (
                  <tr key={livro.id}>
                    <td>{livro.titulo}</td>
                    <td>{livro.autor}</td>
                    <td>{livro.categoria}</td>
                    <td>{livro.isbn}</td>
                    <td>
                      <img src={livro.urlCapa} alt={livro.titulo} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
}
