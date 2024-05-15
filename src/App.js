import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import dos estilos do Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Menu from './Menu';
import IngredientForm from './IngredientForm';
import DishForm from './DishForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderForm from './OrderForm';


const App = () => {
  const [dishes, setDishes] = useState([]);

  const handleDishAdded = (newDish) => {
    setDishes(prevDishes => [...prevDishes, newDish]);
  };

  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/cadastro-ingredientes" element={<IngredientForm />} />
        <Route path="/cadastro-pratos" element={<DishForm onDishAdded={handleDishAdded} />} />
        <Route path="/cadastro-pedidos" element={<OrderForm />} />
      </Routes>
    </Router>
  );
}

export default App;
