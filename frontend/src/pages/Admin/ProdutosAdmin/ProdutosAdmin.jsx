import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ModalAdmin from '../../../components/Admin/ModalAdmin/ModalAdmin';
import InputField from '../../../components/Input/InputField';
import Button from '../../../components/Button/Button';
import Tabela from "../../../components/Admin/Tabela/Tabela";

import produtoServices from '../../../services/produtoServices';
import categoriaServices from '../../../services/categoriaServices';
import pessoaServices from '../../../services/pessoaServices';

export const qualidadeOptions = [
	{ value: 'NOVO', label: 'Novo' },
	{ value: 'USADO', label: 'Usado' },
	{ value: 'SEMINOVO', label: 'Seminovo' }
];

export const statusOptions = [
	{ value: 'DISPONIVEL', label: 'Disponível' },
	{ value: 'EM_NEGOCIACAO', label: 'Em negociação' },
	{ value: 'DOADO', label: 'Doado' }
];

function ProdutosAdmin() {
  const [produtos, setProdutos] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const [pessoas, setPessoas] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [busca, setBusca] = useState('');

  const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [loading, setLoading] = useState(false);
	const [imagem, setImagem] = useState(null);

  const methods = useForm({
    defaultValues: {
      nomeProduto: produtoSelecionado?.nomeProduto || "",
      descricao: produtoSelecionado?.descricao || "",
			qualidade: produtoSelecionado?.qualidade || "",
      imagemUrl: produtoSelecionado?.imagemUrl || "",
		 	status: produtoSelecionado?.status || "",
      categoriaId: produtoSelecionado?.categoriaId || "",
			pessoaId: produtoSelecionado?.pessoaId || "",
      quantidade: produtoSelecionado?.quantidade || 1
    }
  });

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await produtoServices.listarProdutos();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchProdutos();
  }, []);

	useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await categoriaServices.listarCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }
    fetchCategorias();
  }, []);

	useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const data = await pessoaServices.listarPessoas();
        setPessoas(data);
      } catch (error) {
        console.error("Erro ao buscar pessoas:", error);
      }
    }
    fetchPessoas();
  }, []);

  useEffect(() => {
    if (isEditOpen && produtoSelecionado) {
      methods.reset({
        nomeProduto: produtoSelecionado.nomeProduto,
        descricao: produtoSelecionado.descricao,
				qualidade: produtoSelecionado.qualidade || "",
        imagemUrl: produtoSelecionado.imagemUrl || "",
        status: produtoSelecionado.status || "",
        categoriaId: produtoSelecionado.categoriaId,
        quantidade: produtoSelecionado.quantidade,
				pessoaId: produtoSelecionado.pessoaId || ""
      });
			setImagem(produtoSelecionado.imagemUrl || null);
    }
		if (isCadastroOpen) {
			setImagem(null);
		}
  }, [isEditOpen, produtoSelecionado, isCadastroOpen]);

	const handleImagem = (e) => {
		setImagem(e.target.files[0]); 
		methods.setValue('imagemUrl', e.target.files); 
	};

  const handleCadastro = async (data) => {
    setLoading(true);
    try {
			const formData = new FormData();

			formData.append('dados', JSON.stringify({
				nomeProduto: data.nomeProduto,
				descricao: data.descricao,
				categoriaId: Number(data.categoriaId),
				pessoaId: Number(data.pessoaId),
				quantidade: Number(data.quantidade),
				qualidade: data.qualidade?.toUpperCase(),
				status: data.status?.toUpperCase()
			}));

			if (data.imagemUrl && data.imagemUrl[0]) {
				formData.append('imagem', data.imagemUrl[0]);
			};

      const response = await produtoServices.criarProduto(formData);
      setProdutos([...produtos, response]);
      setIsCadastroOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    } finally {
      setLoading(false);
    }
  };

	const handleEdit = async (data) => {
		if (!produtoSelecionado) return;
		setLoading(true);
		try {
			const formData = new FormData();

			formData.append('dados', JSON.stringify({
				nomeProduto: data.nomeProduto,
				descricao: data.descricao,
				categoriaId: Number(data.categoriaId),
				pessoaId: Number(data.pessoaId),
				quantidade: Number(data.quantidade),
				qualidade: data.qualidade?.toUpperCase(),
				status: data.status?.toUpperCase()
			}));

			if (data.imagemUrl && data.imagemUrl[0]) {
				formData.append('imagem', data.imagemUrl[0]);
			}

			const response = await produtoServices.atualizarProduto(produtoSelecionado.id, formData);
			const listaAtualizada = await produtoServices.listarProdutos();
			setProdutos(listaAtualizada);
			setIsEditOpen(false);
		} catch (error) {
			console.error("Erro ao atualizar produto:", error);
		} finally {
			setLoading(false);
		}
	};

  const handleDelete = async () => {
    if (!produtoSelecionado) return;
    setLoading(true);
    try {
      await produtoServices.deletarProduto(produtoSelecionado.id);
      setProdutos(produtos.filter(produto => produto.id !== produtoSelecionado.id));
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    } finally {
      setLoading(false);
    }
  };

  const produtosFiltrados = produtos.filter(produto =>
    produto.nomeProduto.toLowerCase().includes(busca.toLowerCase())
  );

	const categoriaOptions = categorias.map(categoria => ({
			value: categoria.id,
			label: categoria.nomeCategoria
	}));

	const pessoasOptions = pessoas.map(pessoa => ({
		value: pessoa.id,
		label: pessoa.nome
	}))

  return (
    <>
      <div className="container-fluid p-4 bg-light h-100 flex-grow-1 overflow-x-auto">
        <div className="text-center mb-4">
          <h2 className="fs-4 text-dark">Gerenciamento de Produtos</h2>
        </div>

        <div className="d-flex align-items-center mb-4 gap-2">
          <input
            className='mb-1 form-control'
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar produto"
          />
          <Button
            size="sm"
            className="btn-success px-4 py-2 px-3 py-1 rounded-2 fw-bold"
            style={{
              backgroundColor: "#4caf50",
              width: "auto"
            }}
            onClick={() => setIsCadastroOpen(true)}
          >
            Cadastrar Novo Produto
          </Button>
        </div>

        {loading && <p>Carregando...</p>}

        <h3 className="fs-4 text-dark">Lista de Produtos</h3>
        <Tabela>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Qualidade</th>
              <th>Status</th>
              <th>Imagem</th>
              <th>Categoria</th>
							<th>Proprietario</th>
              <th>Quantidade</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map(produto => (
              <tr key={produto.id}>
                <td>{produto.nomeProduto}</td>
                <td>{produto.descricao}</td>
                <td>{produto.qualidade}</td>
                <td>{produto.status}</td>
                <td>
                  {produto.imagemUrl && (
                    <img 
                        src={`${import.meta.env.VITE_API_URL}${produto.imagemUrl}`} 
                        alt={produto.nomeProduto} 
                        style={{ width: 50, height: 50, objectFit: 'cover' }} 
                    />
                  )}
                </td>
                <td>{produto.categoria?.nomeCategoria || produto.categoriaId}</td>
                <td>{produto.pessoa?.nome || produto.pessoaId}</td> 
                <td>{produto.quantidade}</td>
                <td>
                  <Button
                    size="small"
                    className="me-2 py-2 rounded fs-0.9"
                    style={{
                      backgroundColor: "#2196f3"
                    }}
                    onClick={() => {
                      setProdutoSelecionado(produto);
                      setIsEditOpen(true);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    className="btn-danger me-2 py-2 rounded fs-0.9"
                    style={{
                      backgroundColor: "#f44336"
                    }}
                    onClick={() => {
                      setProdutoSelecionado(produto);
                      setIsDeleteOpen(true);
                    }}
                  >
                    Deletar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Tabela>

        <FormProvider {...methods}>
          <ModalAdmin
            isOpen={isCadastroOpen}
            onClose={() => setIsCadastroOpen(false)}
            title="Cadastrar Produto"
            onConfirm={methods.handleSubmit(handleCadastro)}
            confirmText="Cadastrar"
            confirmClass="btn-success"
          >
            <InputField name="nomeProduto" label="Nome" required />
            <InputField name="descricao" label="Descrição" required />
            <InputField
              name="qualidade"
              label="Qualidade"
              as="select"
              options={qualidadeOptions}
            />
            <InputField
                name="imagemUrl"
                label="Foto do Produto"
                type="file"
                accept="image/*"
                onChange={handleImagem}
            />
            <InputField
              name="status"
              label="Status"
              as="select"
              options={statusOptions}
            />
            <InputField
                name="categoriaId"
                label="Categoria"
                as="select"
                options={categoriaOptions}
            />
            <InputField
                name="pessoaId"
                label="Pessoa"
                as="select"
                options={pessoasOptions}
            />
            <InputField name="quantidade" label="Quantidade" type="number" min="1" required />
          </ModalAdmin>

          <ModalAdmin
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            title="Editar Produto"
            onConfirm={methods.handleSubmit(handleEdit)}
            confirmText="Salvar"
            confirmClass="btn-primary"
          >
            <InputField name="nomeProduto" label="Nome" />
            <InputField name="descricao" label="Descrição" />
            <InputField
                name="categoriaId"
                label="Categoria"
                as="select"
                options={categoriaOptions}
            />
            <InputField name="quantidade" label="Quantidade" type="number" min="1" />
          </ModalAdmin>

          <ModalAdmin
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            title="Deletar Produto"
            onConfirm={handleDelete}
            confirmText="Deletar"
            confirmClass="btn-danger"
          >
            <p>Tem certeza que deseja deletar este produto?</p>
          </ModalAdmin>
        </FormProvider>
      </div>
    </>
  );
}

export default ProdutosAdmin;