import React, { useState } from 'react';

const OrderForm = ({ onDishAdded }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    dishName: '',
    paymentMethod: '',
    dishes: [],
  });

  const [dishInput, setDishInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');

  // Lista de opções de pratos pré-definidos
  const predefinedDishes = ['Pizza', 'Hamburguer', 'Macarrão'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDishChange = (e) => {
    setDishInput(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantityInput(e.target.value);
  };

  const handleAddDish = (e) => {
    e.preventDefault();
    if (dishInput && quantityInput) {
      setFormData(prevData => ({
        ...prevData,
        dishes: [...prevData.dishes, { name: dishInput, quantity: quantityInput }],
      }));
      setDishInput('');
      setQuantityInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pedido enviado:", formData);
    onDishAdded(formData);
    setFormData({
      customerName: '',
      dishName: '',
      paymentMethod: '',
      dishes: [],
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Formulário de Pedido</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 rounded">
              <label htmlFor="customerName" className="form-label">Nome do Cliente</label>
              <input type="text" className="form-control rounded" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} required />
            </div>
            <div className="mb-3 rounded">
              <label htmlFor="paymentMethod" className="form-label">Forma de Pagamento</label>
              <select className="form-select rounded" id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                <option value="">Selecione uma forma de pagamento</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Débito">Débito</option>
                <option value="Crédito">Crédito</option>
              </select>
            </div>
            <div className="mb-3 rounded">
              <label htmlFor="dish" className="form-label">Prato</label>
              <div className="input-group rounded">
                <select className="form-select rounded" value={dishInput} onChange={handleDishChange}>
                  <option value="">Selecione um prato</option>
                  {predefinedDishes.map((dish, index) => (
                    <option key={index} value={dish}>{dish}</option>
                  ))}
                </select>
                <input type="text" className="form-control rounded" id="quantity" name="quantity" value={quantityInput} onChange={handleQuantityChange} placeholder="Quantidade" />
                <button onClick={handleAddDish} className="btn btn-danger">Adicionar</button>
              </div>
            </div>
            {formData.dishes.length > 0 && (
              <div className="mb-3">
                <label className="form-label">Pratos Adicionados:</label>
                <ul className="list-group">
                  {formData.dishes.map((dish, index) => (
                    <li key={index} className="list-group-item">{dish.name} - {dish.quantity}</li>
                  ))}
                </ul>
              </div>
            )}
            <button type="submit" className="btn btn-danger">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
