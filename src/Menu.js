import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pedidoImage from './images/pedido2.png'; 

const Menu = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 991); // Define isDesktop como true se a largura da janela for maior que 991px (tamanho desktop)
    };

    handleResize(); // Executa a função uma vez ao montar o componente para definir o estado inicial

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <img src={pedidoImage} alt="Home" style={{ height: '60px', width:'60px',  marginLeft: '20px' }} /> {/* Adicionando margem à esquerda */}
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-center ${menuOpen ? 'show' : ''}`} id="navbarNav" style={{ marginLeft: isDesktop ? '-130px' : '0' }}> {/* Aplica a margem apenas se for uma tela de desktop */}
          <ul className="navbar-nav mx-auto">
          <li className="nav-item ms-3">
              <Link to="/home" className="nav-link text-white">Início</Link>
            </li>
            <li className="nav-item ms-3">
              <Link to="/cadastro-ingredientes" className="nav-link text-white">Cadastrar Ingredientes</Link>
            </li>
            <li className="nav-item ms-3">
              <Link to="/cadastro-pratos" className="nav-link text-white">Cadastrar Pratos</Link>
            </li>
            <li className="nav-item ms-3">
              <Link to="/cadastro-pedidos" className="nav-link text-white">Cadastrar Pedidos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
