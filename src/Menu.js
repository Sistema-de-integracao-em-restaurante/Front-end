import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger rounded p-3 mb-4">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/cadastro-ingredientes" className="nav-link text-white">Cadastrar Ingredientes</Link>
            </li>
            <li className="nav-item">
              <Link to="/cadastro-pratos" className="nav-link text-white">Cadastrar Pratos</Link>
            </li>
            <li className="nav-item">
              <Link to="/cadastro-pedidos" className="nav-link text-white">Cadastrar Pedidos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
