import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IngredientForm = () => {
  const [ingredient, setIngredient] = useState({ nome: '', descricao: '', medida: 'g' });
  const [ingredientList, setIngredientList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://restaurante-prod-mayrink-0fddee46.koyeb.app/api/ingrediente');
        setIngredientList(response.data);
      } catch (error) {
        console.error('Erro ao buscar ingredientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngredient(prevIngredient => ({ ...prevIngredient, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://restaurante-prod-mayrink-0fddee46.koyeb.app/api/ingrediente', {
        nome: ingredient.nome,
        descricao: ingredient.descricao,
        medida: ingredient.medida
      });
      setIngredientList(prevList => [...prevList, response.data]);
      setIngredient({ nome: '', descricao: '', medida: 'g' });
      setMessage('Ingrediente cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar ingrediente:', error);
      setMessage('Erro ao cadastrar ingrediente. Tente novamente.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://restaurante-prod-mayrink-0fddee46.koyeb.app/api/ingrediente/${id}`);
      setIngredientList(prevList => prevList.filter(ingredient => ingredient.id !== id));
      setMessage('Ingrediente removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover ingrediente:', error);
      setMessage('Erro ao remover ingrediente. Verifique se ele está associado a um prato.');
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Cadastrar Ingredientes</h2>
          {message && (
            <div className="alert alert-info" role="alert">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="mx-auto">
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome do Ingrediente</label>
              <input type="text" className="form-control" id="nome" name="nome" value={ingredient.nome} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">Descrição do Ingrediente</label>
              <input type="text" className="form-control" id="descricao" name="descricao" value={ingredient.descricao} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="medida" className="form-label">Medida do Ingrediente</label>
              <select className="form-control" id="medida" name="medida" value={ingredient.medida} onChange={handleChange} required>
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="l">l</option>
                <option value="ml">ml</option>
                <option value="un">un</option>
              </select>
            </div>
            <button type="submit" className="btn btn-danger">Cadastrar</button>
          </form>

          <div className="mt-5">
            <h2 className="text-center mb-4">Lista de Ingredientes</h2>
            {loading ? (
              <p>Carregando ingredientes...</p>
            ) : (
              <ul className="list-group">
                {ingredientList.map((ingredient, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{ingredient.nome}</strong>: {ingredient.descricao} - {ingredient.medida}
                    </div>
                    <button onClick={() => handleDelete(ingredient.id)} className="btn btn-danger btn-sm">Excluir</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientForm;
