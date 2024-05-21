import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = ({ orders, dishOptions }) => (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-12">
        <h2 className="text-center">Lista de Pedidos</h2>
        <ul className="list-group">
          {orders.map(order => (
            <li key={order.id} className="list-group-item">
              <strong>Cliente:</strong> {order.nome_cliente}<br />
              <strong>Forma de Pagamento:</strong> {order.forma_pagamento}<br />
              <strong>Pratos:</strong>
              <ul className="list-group">
                {order.pratos.map(prato => {
                  const selectedDish = dishOptions.find(dish => dish.id === prato.id_prato);
                  return (
                    <li key={prato.id_prato} className="list-group-item">
                      {selectedDish ? `${selectedDish.nome} - ${prato.quantidade_prato}` : 'Prato não encontrado'}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const OrderForm = ({ onDishAdded }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    paymentMethod: '',
    dishes: [],
  });

  const [dishInput, setDishInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');
  const [dishOptions, setDishOptions] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('https://restaurante-prod-mayrink-0fddee46.koyeb.app/api/prato');
        setDishOptions(response.data);
      } catch (error) {
        console.error('Erro ao buscar pratos:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://restaurante-prod-mayrink-0fddee46.koyeb.app/api/pedido');
        setOrders(response.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

    fetchDishes();
    fetchOrders();
  }, []);

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

  const handleAddDish = async (e) => {
    e.preventDefault();
    if (dishInput && quantityInput) {
      try {
        const selectedDishResponse = await axios.get(`https://restaurante-prod-mayrink-0fddee46.koyeb.app/api/prato/${dishInput}`);
        const selectedDish = selectedDishResponse.data;
        setFormData(prevData => ({
          ...prevData,
          dishes: [...prevData.dishes, { id: selectedDish.id, name: selectedDish.nome, quantity: quantityInput }],
        }));
        setDishInput('');
        setQuantityInput('');
      } catch (error) {
        console.error('Erro ao buscar prato:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data before submit:', formData);
    try {
      const orderResponse = await axios.post('https://restaurante-prod-mayrink-0fddee46.koyeb.app/api/pedido', {
        nome_cliente: formData.customerName,
        forma_pagamento: formData.paymentMethod,
      });

      const orderId = orderResponse.data.id;
      console.log('Order Response:', orderResponse.data);

      await Promise.all(
        formData.dishes.map(async (dish) => {
          const response = await axios.post(`https://restaurante-prod-mayrink-0fddee46.koyeb.app/api/pedido/${orderId}/prato`, {
            id_prato: dish.id,
            quantidade_prato: dish.quantity,
          });
          console.log('Dish Response:', response.data);
        })
      );

      console.log('Pedido enviado com sucesso:', orderResponse.data);
      onDishAdded(orderResponse.data);
      setFormData({
        customerName: '',
        paymentMethod: '',
        dishes: [],
      });

      const updatedOrders = await axios.get('https://restaurante-prod-mayrink-0fddee46.koyeb.app/api/pedido');
      setOrders(updatedOrders.data);

    } catch (error) {
      console.error('Erro ao enviar pedido:', error.response ? error.response.data : error.message);
    }
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
                <option value="Debito">Débito</option>
                <option value="Credito">Crédito</option>
              </select>
            </div>
            <div className="mb-3 rounded">
              <label htmlFor="dish" className="form-label">Prato</label>
              <div className="input-group rounded">
                <select className="form-select rounded" value={dishInput} onChange={handleDishChange}>
                  <option value="">Selecione um prato</option>
                  {dishOptions.map((dish, index) => (
                    <option key={index} value={dish.id}>{dish.nome}</option>
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
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <OrderList orders={orders} dishOptions={dishOptions} />
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
