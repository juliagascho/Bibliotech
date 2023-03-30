import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { addLivro, uploadCapaLivro } from "../../firebase/livros";

export function AdicionarLivro() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    function onSubmit(data) {
        const imagem = data.imagem[0]; //imagem nome do campo
        if(imagem) {
            //se a imagem existir, vai fazer o upload
            const toastId = toast.loading("Upload da imagem...", {position: "top-right"});
            uploadCapaLivro(imagem).then(url => {
                toast.dismiss(toastId);
                data.urlCapa = url;
                delete data.imagem;
                addLivro(data)
                // salvar no banco de dados
                    toast.success("Livro adicionado com sucesso!", { duration: 2000, position: "botton-right" })
                    navigate("/livros")
            })            
        } else {
            delete data.imagem;
            addLivro(data)
                toast.success("Livro adicionado com sucesso!", { duration: 2000, position: "botton-right" })
                navigate("/livros")
        }       
    }

    return (
        <div className="adicionar-livro">
            <Container>
                <h1>Adicionar livro</h1>
                <hr />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Título</Form.Label>
                        <Form.Control className={errors.titulo && "is-invalid"} type="text" {...register("titulo", {required:"Título é obrigatório", maxLength: { value: 255, message: "Limite de 255 caracteres."}})} />
                        <Form.Text className="text-danger">
                            {errors.titulo?.message}
                            {/* a interrogação é porque o título pode nao existir */}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control className={errors.autor && "is-invalid"} type="text" {...register("autor", {required: "Autor é obrigatório", maxLength: { value: 255, message: "Limite de 255 caracteres."}})} />
                        <Form.Text className="text-danger">
                            {errors.autor?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control className={errors.categoria && "is-invalid"} type="text" {...register("categoria", {required: "Categoria é obrigatória", maxLength: { value: 255, message: "Limite de 255 caracteres."}})} />
                        <Form.Text className="text-danger">
                            {errors.categoria?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control className={errors.isbn && "is-invalid"} type="text" {...register("isbn", {required: "ISBN é obrigatório", maxLength: { value: 255, message: "Limite de 255 caracteres."}})} />
                        <Form.Text className="text-danger">
                            {errors.isbn?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Imagem da capa</Form.Label>
                        <Form.Control type="file" accept=".png,.jpg,.jpeg,.gif" {...register("imagem")} />
                    </Form.Group>
                    <Button type="submit" variant="success">Adicionar</Button>
                </Form>
            </Container>
        </div>
    )
}