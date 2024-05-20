import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DishForm = ({ onDishAdded }) => {
  const [dish, setDish] = useState({
    name: '',
    price: '',
    ingredients: [],
  });

  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [quantityInput, setQuantityInput] = useState('');
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('https://restaurante-prod-mayrink-0fddee46.koyeb.app/api/ingrediente');
        setIngredientOptions(response.data);
      } catch (error) {
        console.error('Erro ao buscar ingredientes:', error);
      }
    };

    fetchIngredients();
  }, []);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('https://restaurante-prod-mayrink-0fddee46.koyeb.app/api/prato');
        setDishes(response.data);
      } catch (error) {
        console.error('Erro ao buscar pratos:', error);
      }
    };

    fetchDishes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish(prevDish => ({
      ...prevDish,
      [name]: value
    }));
  };

  const handleIngredientChange = (e) => {
    setSelectedIngredient(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantityInput(e.target.value);
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (selectedIngredient && quantityInput) {
      const selectedIngredientObj = ingredientOptions.find(ingredient => ingredient.nome === selectedIngredient);
      if (selectedIngredientObj) {
        setDish(prevDish => ({
          ...prevDish,
          ingredients: [...prevDish.ingredients, { id_ingrediente: selectedIngredientObj.id, quantidade_ingrediente: parseInt(quantityInput) }],
        }));
        setSelectedIngredient('');
        setQuantityInput('');
      } else {
        console.error('Ingrediente não encontrado.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Cria o novo prato no servidor
      const pratoResponse = await axios.post('https://restaurante-prod-mayrink-0fddee46.koyeb.app/api/prato', {
        nome: dish.name,
        preco: parseFloat(dish.price),
      });

      // Obtém o ID do prato criado
      const pratoId = pratoResponse.data.id;

      // Associa os ingredientes ao prato
      await Promise.all(
        dish.ingredients.map(async (ingredient) => {
          await axios.post(`https://restaurante-prod-mayrink-0fddee46.koyeb.app/api/prato/${pratoId}/ingrediente`, {
            id_ingrediente: ingredient.id_ingrediente,
            quantidade_ingrediente: ingredient.quantidade_ingrediente,
          });
        })
      );

      console.log('Prato cadastrado com ingredientes:', pratoResponse.data);
      onDishAdded(pratoResponse.data);
      setDish({
        name: '',
        price: '',
        ingredients: [],
      });
    } catch (error) {
      console.error('Erro ao cadastrar prato:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Cadastrar Prato</h2>
          {/* Formulário para adicionar prato */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 rounded">
              <label htmlFor="name" className="form-label">Nome do Prato</label>
              <input type="text" className="form-control rounded" id="name" name="name" value={dish.name} onChange={handleChange} required />
            </div>
            <div className="mb-3 rounded">
              <label htmlFor="price" className="form-label">Preço do Prato</label>
              <div className="input-group rounded">
                <span className="input-group-text">R$</span>
                <input type="number" step="0.01" className="form-control rounded" id="price" name="price" value={dish.price} onChange={handleChange} required />
              </div>
            </div>
            {/* Aqui é onde os ingredientes selecionados são exibidos */}
            {dish.ingredients.length > 0 && (
              <div className="mb-3">
                <label className="form-label">Ingredientes Adicionados:</label>
                <ul className="list-group">
                  {dish.ingredients.map((ingredient, index) => (
                    <li key={index} className="list-group-item">{ingredientOptions.find(opt => opt.id === ingredient.id_ingrediente)?.nome} - {ingredient.quantidade_ingrediente}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* Aqui é onde os ingredientes podem ser adicionados */}
            <div className="mb-3 rounded">
              <label htmlFor="ingredient" className="form-label">Ingrediente</label>
              <div className="input-group rounded">
                <select className="form-select rounded" value={selectedIngredient} onChange={handleIngredientChange}>
                  <option value="">Selecione um ingrediente</option>
                  {ingredientOptions.map((ingredient, index) => (
                    <option key={index} value={ingredient.nome}>{ingredient.nome}</option>
                  ))}
                </select>
                <input type="text" className="form-control rounded" id="quantity" name="quantity" value={quantityInput} onChange={handleQuantityChange} placeholder="Quantidade" />
                <button onClick={handleAddIngredient} className="btn btn-danger">Adicionar</button>
              </div>
            </div>
            <button type="submit" className="btn btn-danger">Cadastrar</button>
          </form>
        </div>
      </div>
      {/* Aqui é onde a lista de pratos será exibida */}
      <div className="row justify-content-center mt-5" style={{ marginBottom: '20px' }}>
        <div className="col-md-6">
          <h2 className="text-center mb-4">Pratos Cadastrados</h2>
          <ul className="list-group">
            {dishes.map((dish) => (
              <li key={dish.id} className="list-group-item">
                {dish.nome} - R${dish.preco}
                {/* Exibe os ingredientes do prato */}
                <ul>
                  {dish.ingredientes.map((ingrediente) => (
                    <li key={ingrediente.id_ingrediente}>
                      {ingredientOptions.find(opt => opt.id === ingrediente.id_ingrediente)?.nome} - {ingrediente.quantidade_ingrediente}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DishForm;
