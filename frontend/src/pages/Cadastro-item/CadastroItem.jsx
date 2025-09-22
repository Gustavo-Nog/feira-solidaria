import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button/Button';
import {qualidadeOptions, statusOptions} from '../Admin/ProdutosAdmin/ProdutosAdmin.jsx';

import produtoService from '../../services/produtoServices';
import categoriaServices from '../../services/categoriaServices';

import './Cadastro-item.css';

function CadastrarItem() {
	const [produtos, setProdutos] = useState([]);
	const [categorias, setCategorias] = useState([]);

  const methods = useForm();
  const navigate = useNavigate();

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

	const onSubmit = async (data) => {
		try {
			const formData = new Formdata();
			
			formData.append('dados', JSON.stringify({
				nomeProduto: data.nomeProduto,
				descricao: data.descricao,
				categoriaId: Number(data.categoriaId),
				quantidade: Number(data.quantidade),
				qualidade: data.qualidade?.toUpperCase(),
				status: data.status?.toUpperCase()
			}));

			if (data.imagemUrl && data.imagemUrl[0]) {
				formData.append('imagem', data.imagemUrl[0]);
			};

			const response = await produtoService.criarProduto(formData);
			setProdutos([...produtos, response]); 
			console.log('Resposta do backend:', response);
			navigate('/perfil'); 
		} catch (error) {
			console.error('Erro ao cadastrar item:', error);
			alert('Erro ao cadastrar item. Verifique o console.');
		}
  };

	const categoriaOptions = categorias.map(categoria => ({
		value: categoria.id,
		label: categoria.nome
	}))

  return (
    <FormProvider {...methods}>
      <div className="formulario-container container py-4">
        <h2 className="text-center text-uppercase fw-bold mb-4">Cadastro de Item </h2>

        <form className="formulario" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="row g-3">
						<div clasName="col-md-12">
							<div classname="campo">
								<InputField
									name="imagemUrl"
									label="Foto do Produto"
									type="file"
									accept="image/*"
									onChange={handleImagem}
								/>
							</div>
						</div>

            <div className="col-md-6">
              <div className="campo">
                <InputField 
									name="nomeProduto" 
									label="Nome" 
									required
								/>
              </div>
            </div>

            <div className="col-md-6">
              <div className="campo">
                <InputField
									name="categoriaId"
									label="Categoria"
									as="select"
									options={categoriaOptions}
								/>
              </div>
            </div>

						<div className="col-md-6">
              <div className="campo">
                <InputField
									name="qualidade"
									label="Qualidade"
									as="select"
									options={qualidadeOptions}
								/>
              </div>

						<div className="col-md-6">
							<div className="campo">
								<InputField
									name="status"
									label="Status"
									as="select"
									options={statusOptions}
								/>
							</div>
						</div>

						<div className="col-md-6">
							<div className="campo">
								<InputField 
									name="quantidade" 
									label="Quantidade" 
									type="number" 
									required 
								/>
							</div>
						</div>

            <div className="col-md-6">
              <div className="campo">
                <InputField name="localizacao" label="Localização (Bairro ou Cidade):" required />
              </div>
            </div>

            <div className="col-md-6">
              <div className="campo">
                <InputField 
									name="telefone" 
									label="Telefone:" 
									required placeholder="(99) 99999-9999" 
								/>
              </div>
            </div>

            <div className="col-12">
              <div className="campo">
                <InputField 
								as="textarea" 
								label="Descrição:" required rows={3} />
              </div>
            </div>

            <div className="col-12 d-flex flex-column flex-sm-row justify-content-between gap-2">
              <Button
                type="button"
                className="btn-danger w-100 w-sm-auto"
                onClick={() => navigate('/perfil')}
              >
                Cancelar
              </Button>

              <Button
                type="button"
                className="btn-primary w-100 w-sm-auto"
								onClick={methods.handleSubmit(onSubmit)}
              >
                Cadastrar Item
              </Button>
            </div>
          </div>
      	</form>
			</div>
		</FormProvider>
	);
}

export default CadastrarItem;