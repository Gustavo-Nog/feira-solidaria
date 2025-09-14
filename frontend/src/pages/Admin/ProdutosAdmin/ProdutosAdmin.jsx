import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ModalAdmin from '../../../components/Admin/ModalAdmin/ModalAdmin';
import InputField from '../../../components/Input/InputField';

import produtoServices from '../../../services/produtoServices';

function ProdutosAdmin() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm();

  const handleSave = (data) => {
    console.log("Salvando produto:", data);
    setIsModalOpen(false);
  };

	return(
		<>
			<div>
					<button onClick={() => setIsModalOpen(true)}>Cadastrar Produto</button>

					<FormProvider {...methods}>
						<ModalAdmin
							isOpen={isModalOpen}
							onClose={() => setIsModalOpen(false)}
							title="Cadastrar Produto"
							onConfirm={methods.handleSubmit(handleSave)}
							confirmText="Cadastrar"
							confirmClass="btn-success"
						>
							<InputField name="nome" label="Nome" required />
							<InputField name="descricao" label="Descrição" required />
							<InputField name="imagem" label="Imagem" required />
						</ModalAdmin>
					</FormProvider>
				</div>
		</>
	);
};

export default ProdutosAdmin;