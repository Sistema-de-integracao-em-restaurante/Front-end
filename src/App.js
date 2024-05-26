import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import dos estilos do Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Menu from './Menu';
import Home from './Home';
import IngredientForm from './IngredientForm';
import DishForm from './DishForm';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrderForm from './OrderForm';

import './index.css'; // Import do arquivo CSS global

const App = () => {
  const [dishes, setDishes] = useState([]);

  const handleDishAdded = (newDish) => {
    setDishes(prevDishes => [...prevDishes, newDish]);
  };

  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/cadastro-ingredientes" element={<IngredientForm />} />
        <Route path="/cadastro-pratos" element={<DishForm onDishAdded={handleDishAdded} />} />
        <Route path="/cadastro-pedidos" element={<OrderForm />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
