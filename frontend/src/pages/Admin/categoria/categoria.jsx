import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Button from '../../components/Button/Button';
import InputField from '../../components/Input/InputField';

import categoriaServices from '../../services/categoriaServices';

import './categoria.css';

function Categorias() {
  const methods = useForm();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchCategorias = async () => {
    setListLoading(true);
    try {
      const data = await categoriaServices.listarCategorias();
      const normalizadas = Array.isArray(data)
        ? data.map((c) => ({
            id: c.id || c.id_categoria,
            nomeCategoria: c.nomeCategoria || c.nome_categoria,
            descricao: c.descricao || '',
          }))
        : [];
      setCategorias(normalizadas);
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar categorias.');
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      if (editing) {
        const payload = {
          nomeCategoria: formData.nomeCategoria,
          descricao: formData.descricao,
        };
        const updated = await categoriaServices.atualizarCategoria(editing.id, payload);
        if (updated) {
          setCategorias((prev) =>
            prev.map((c) => (c.id === editing.id ? { ...c, ...payload } : c))
          );
        } else {
          fetchCategorias();
        }
        setEditing(null);
      } else {
        const payload = {
          nomeCategoria: formData.nomeCategoria,
          descricao: formData.descricao,
        };
        const created = await categoriaServices.criarCategoria(payload);
        if (created) {
          setCategorias((prev) => [
            ...prev,
            {
              id: created.id || created.id_categoria,
              nomeCategoria: created.nomeCategoria || created.nome_categoria,
              descricao: created.descricao || '',
            },
          ]);
        } else {
          fetchCategorias();
        }
      }
      methods.reset();
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar categoria.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (categoria) => {
    setEditing(categoria);
    methods.reset(categoria);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta categoria?')) return;
    try {
      await categoriaServices.deletarCategoria(id);
      setCategorias((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar categoria.');
    }
  };

  return (
    <div className="categoria-container">
      <div className="categoria-content">
        <h2>Gerenciar Categorias</h2>
        <div className="categoria-layout">
          <div className="categoria-form-section">
            <h3>{editing ? 'Editar Categoria' : 'Nova Categoria'}</h3>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <InputField
                  name="nomeCategoria"
                  label="Nome da Categoria"
                  placeholder="Ex: Eletrônicos"
                  rules={{ required: 'Este campo é obrigatório' }}
                />

                <InputField
                  name="descricao"
                  label="Descrição"
                  placeholder="Ex: Produtos de tecnologia"
                />

                <Button type="submit" loading={loading} className="btn-success">
                  {editing ? 'Atualizar' : 'Salvar'}
                </Button>
              </form>
            </FormProvider>
          </div>

          {/* Lista */}
          <div className="categoria-list-section">
            <h3>Lista de Categorias</h3>
            {listLoading ? (
              <p>Carregando...</p>
            ) : categorias.length === 0 ? (
              <p>Nenhuma categoria encontrada.</p>
            ) : (
              <ul>
                {categorias.map((c) => (
                  <li key={c.id}>
                    <strong>{c.nomeCategoria}</strong> - {c.descricao}
                    <div>
                      <Button onClick={() => handleEdit(c)} className="btn-edit">
                        Editar
                      </Button>
                      <Button onClick={() => handleDelete(c.id)} className="btn-danger">
                        Excluir
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categorias;