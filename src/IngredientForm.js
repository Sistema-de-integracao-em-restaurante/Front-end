import React, { useState } from 'react';

const IngredientForm = () => {
  const [ingredient, setIngredient] = useState({ name: '', value: '' });
  const [ingredientList, setIngredientList] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngredient(prevIngredient => ({ ...prevIngredient, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIngredientList(prevList => [...prevList, ingredient]);
    setIngredient({ name: '', value: '' });
  };

  const handleSelectChange = (e) => {
    setSelectedIngredient(e.target.value);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center"> {/* Adicionando a classe row e justify-content-center */}
        <div className="col-md-6"> {/* Adicionando a classe col-md-6 */}
          <h2 className="text-center mb-4">Cadastrar Ingredientes</h2>
          <form onSubmit={handleSubmit} className="mx-auto">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nome do Ingrediente</label>
              <input type="text" className="form-control" id="name" name="name" value={ingredient.name} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-danger">Cadastrar</button>
          </form>

          <div className="mt-5">
            <h2 className="text-center mb-4">Lista de Ingredientes</h2>
            <ul className="list-group">
              {ingredientList.map((ingredient, index) => (
                <li key={index} className="list-group-item">{ingredient.name}</li>
              ))}
            </ul>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default IngredientForm;
