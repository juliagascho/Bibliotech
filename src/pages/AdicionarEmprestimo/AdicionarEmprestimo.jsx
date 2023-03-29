import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { adicionarEmprestimo } from "../../firebase/emprestimos";
import { getLivro, getLivros } from "../../firebase/livros";

export function AdicionarEmprestimo() {

    const [ livros, setLivros ] = useState([]); 
  
    const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    getLivro(data.idLivro).then(livro => {
        delete data.idLivro
        let novoEmprestimo = {...data, status: "Pendente", livro, dataEmprestimo: new Date()}
        adicionarEmprestimo(novoEmprestimo).then(() => {
            toast.success("Emprestimo adicionado com sucesso!", { duration: 2000, position: "botton-right" })
            navigate("/emprestimos");
        })
    })    
  }
  // o toast é acionado quando a função for executada com sucesso
  // vai chegar o data no SubmitEvent, com id do livro, getlivro traz o livro, depois que trazer o livro vou ter o objeto livro. agora pode adicionar um objeto, pois o livro chegou
  // delete data.idlivro foi colocado apenas para não duplicar o id

  useEffect(() => {
    getLivros().then(busca => {
        setLivros(busca)
    });    
  }, [])

  return (
    <div className="adicionar-emprestimo">
      <h1>Adicionar empréstimo</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Leitor</Form.Label>
          <Form.Control
            type="text"
            className={errors.leitor && "is-invalid"}
            {...register("leitor", {
              required: "Leitor é obrigatório!",
              maxLength: { value: 255, message: "Limite de 255 caracteres." }
            })}
          />
          <Form.Text className="invalid-feedback">
            {errors.leitor?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            className={errors.email && "is-invalid"}
            {...register("email", {
              required: "Email é obrigatório!",
              maxLength: { value: 255, message: "Limite de 255 caracteres." }
            })}
          />
          <Form.Text className="invalid-feedback">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="tel"
            className={errors.telefone && "is-invalid"}
            {...register("telefone", {
              required: "Telefone é obrigatório!",
              maxLength: { value: 255, message: "Limite de 255 caracteres." }
            })}
          />
          <Form.Text className="invalid-feedback">
            {errors.telefone?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Telefone</Form.Label>
          <Form.Select className={errors.idLivro && "is-invalid"} {...register("idLivro", {required: "Livro é obrigatório!"})}>
            <option value="" disabled select>Selecione um livro</option>
            {livros.map(livro => <option key={livro.id} value={livro.id}>{livro.titulo}</option>)}
          </Form.Select>
          <Form.Text className="invalid-feedback">
            {errors.idLivro?.message}
          </Form.Text>
        </Form.Group>
        <Button type="submit" variant="success">
          Emprestar
        </Button>
      </Form>
    </div>
  );
}
