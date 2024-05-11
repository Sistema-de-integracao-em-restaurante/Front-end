import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IngredientForm = () => {
  const [ingredient, setIngredient] = useState({ nome: '', descricao: '' });
  const [ingredientList, setIngredientList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Função para buscar ingredientes disponíveis ao montar o componente
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://popular-candace-mayrink-0b01383d.koyeb.app/ingrediente');
        console.log(response.data); // Verifica se os dados foram recebidos corretamente
        setIngredientList(response.data);
      } catch (error) {
        console.error('Erro ao buscar ingredientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []); // Executa apenas uma vez ao montar o componente

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngredient(prevIngredient => ({ ...prevIngredient, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Dados do ingrediente:', ingredient); // Verifica se os dados do ingrediente estão corretos
      const response = await axios.post('https://popular-candace-mayrink-0b01383d.koyeb.app/ingrediente', ingredient);
      console.log('Resposta da requisição POST:', response.data); // Verifica se a requisição POST foi bem-sucedida
      setIngredientList(prevList => [...prevList, response.data]);
      setIngredient({ nome: '', descricao: '' });
    } catch (error) {
      console.error('Erro ao cadastrar ingrediente:', error); // Imprime o erro caso ocorra algum problema
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Cadastrar Ingredientes</h2>
          <form onSubmit={handleSubmit} className="mx-auto">
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome do Ingrediente</label>
              <input type="text" className="form-control" id="nome" name="nome" value={ingredient.nome} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">Descrição do Ingrediente</label>
              <input type="text" className="form-control" id="descricao" name="descricao" value={ingredient.descricao} onChange={handleChange} required />
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
                  <li key={index} className="list-group-item">{ingredient.nome}</li>
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