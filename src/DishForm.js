import React, { useState } from 'react';

const DishForm = ({ onDishAdded }) => {
  const [dish, setDish] = useState({
    name: '',
    price: '',
    ingredients: [],
  });

  const [ingredientInput, setIngredientInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');

  // Lista de opções de ingredientes pré-definidos
  const predefinedIngredients = ['Tomate', 'Cebola', 'Alho', 'Cenoura', 'Batata', 'Salsa', 'Cebolinha', 'Pimentão'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish(prevDish => ({
      ...prevDish,
      [name]: value
    }));
  };

  const handleIngredientChange = (e) => {
    setIngredientInput(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantityInput(e.target.value);
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (ingredientInput && quantityInput) {
      setDish(prevDish => ({
        ...prevDish,
        ingredients: [...prevDish.ingredients, { name: ingredientInput, quantity: quantityInput }],
      }));
      setIngredientInput('');
      setQuantityInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Prato cadastrado:", dish);
    onDishAdded(dish);
    setDish({
      name: '',
      price: '',
      ingredients: [],
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Cadastrar Prato</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 rounded">
              <label htmlFor="name" className="form-label">Nome do Prato</label>
              <input type="text" className="form-control rounded" id="name" name="name" value={dish.name} onChange={handleChange} required />
            </div>
            <div className="mb-3 rounded">
              <label htmlFor="price" className="form-label">Preço do Prato</label>
              <div className="input-group rounded">
                <span className="input-group-text">R$</span>
                <input type="text" className="form-control rounded" id="price" name="price" value={dish.price} onChange={handleChange} required />
              </div>
            </div>
            <div className="mb-3 rounded">
              <label htmlFor="ingredient" className="form-label">Ingrediente</label>
              <div className="input-group rounded">
                <select className="form-select rounded" value={ingredientInput} onChange={handleIngredientChange}>
                  <option value="">Selecione um ingrediente</option>
                  {predefinedIngredients.map((ingredient, index) => (
                    <option key={index} value={ingredient}>{ingredient}</option>
                  ))}
                </select>
                <input type="text" className="form-control rounded" id="quantity" name="quantity" value={quantityInput} onChange={handleQuantityChange} placeholder="Quantidade" />
                <button onClick={handleAddIngredient} className="btn btn-danger">Adicionar</button>
              </div>
            </div>
            {dish.ingredients.length > 0 && (
              <div className="mb-3">
                <label className="form-label">Ingredientes Adicionados:</label>
                <ul className="list-group">
                  {dish.ingredients.map((ingredient, index) => (
                    <li key={index} className="list-group-item">{ingredient.name} - {ingredient.quantity}</li>
                  ))}
                </ul>
              </div>
            )}
            <button type="submit" className="btn btn-danger">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DishForm;
