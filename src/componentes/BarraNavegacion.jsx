import { Link } from 'react-router-dom'; 
import './BarraNavegacion.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false); // Estado para controlar la visibilidad del menú

  return (
    <header>
      <nav className="navbar">
        <ul className='navbar-list'>
          <li className='elemento-header'><Link to="/tienda">Tienda</Link></li>
          <li 
            className='elemento-header' 
            onMouseEnter={() => setMenuVisible(true)} // Mostrar menú al pasar el mouse
            onMouseLeave={() => setMenuVisible(false)} // Ocultar menú al salir el mouse
          >
            <li>Categorías</li>
            {menuVisible && ( // Mostrar menú desplegable si está visible
              <ul className='submenu'>
                <li><Link to="/categorias/categoria1">FPS</Link></li>
                <li><Link to="/categorias/categoria2">Survival</Link></li>
                <li><Link to="/categorias/categoria3">mundo abierto</Link></li>
                <li><Link to="/categorias/categoria4">farmeo</Link></li>
                <li><Link to="/categorias/categoria4">construccion</Link></li>
               
              </ul>
            )}
          </li>
          <li className='elemento-header'><Link to="/carrito">Carrito</Link></li>
          <li className='elemento-header'><Link to="/biblioteca">Biblioteca</Link></li>
          <li className='elemento-header'><Link to="/deseados">Deseados</Link></li>
          <li className='elemento-header'>
            <div className='usuario-header'>              
              <AccountCircleIcon/>
              <Link to="/account">Agusmel03</Link>
            </div>
          </li>
        </ul>
        <div className='box-input'>
          <input type="text" className='busqueda-header' />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
