import { Link, useNavigate } from 'react-router-dom'; 
import './BarraNavegacion.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';
import Slider from 'react-slider';

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false); // Estado del menú de categorías
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false); // Estado del menú de idiomas
  const [osMenuVisible, setOsMenuVisible] = useState(false); // Estado del menú de sistemas operativos
  const [priceMenuVisible, setPriceMenuVisible] = useState(false); // Estado del menú de precios
  const [priceRange, setPriceRange] = useState([0, 1500000]); // Estado para el rango de precios
  const navigate = useNavigate();

  // Maneja el cambio del rango de precios
  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
  };

  // Función para aplicar el filtro con todos los parámetros
  const applyFilters = () => {
    const [minPrice, maxPrice] = priceRange;
    navigate(`/tienda?min=${minPrice}&max=${maxPrice}`);
  };

  return (
    <header>
      <nav className="navbar">
        <ul className='navbar-list'>
          <li className='elemento-header'><Link to="/tienda">Tienda</Link></li>

          {/* Menú Categorías */}
          <li 
            className='elemento-header' 
            onMouseEnter={() => setMenuVisible(true)} 
            onMouseLeave={() => setMenuVisible(false)}
          >
            <li>Categorías</li>
            {menuVisible && (
              <ul className='submenu'>
                <li><Link to="/tienda/Cooperativo">Cooperativo</Link></li>
                <li><Link to="/tienda/Multijugador">Multijugador</Link></li>                
                <li><Link to="/tienda/Un Jugador">Un Jugador</Link></li>
                <li><Link to="/tienda/FPS">FPS</Link></li>
                <li><Link to="/tienda/RPG">RPG</Link></li>
                <li><Link to="/tienda/Mundo Abierto">Mundo Abierto</Link></li>
                <li><Link to="/tienda/Survival">Survival</Link></li>
                <li><Link to="/tienda/Acción">Acción</Link></li>
                <li><Link to="/tienda/Fantasía">Fantasía</Link></li>
                <li><Link to="/tienda/Guerra">Guerra</Link></li>
                <li><Link to="/tienda/Aventura">Aventura</Link></li>
                <li><Link to="/tienda/Superhéroes">Superhéroes</Link></li>
                <li><Link to="/tienda/Desafío Extremo">Desafío Extremo</Link></li>
              </ul>
            )}
          </li>

          {/* Menú Idioma */}
          <li 
            className='elemento-header' 
            onMouseEnter={() => setLanguageMenuVisible(true)} 
            onMouseLeave={() => setLanguageMenuVisible(false)}
          >
            <li>Idiomas</li>
            {languageMenuVisible && (
              <ul className='submenu'>
                <li><Link to="/tienda/Español">Español</Link></li>
                <li><Link to="/tienda/Inglés">Inglés</Link></li>
                <li><Link to="/tienda/Ruso">Ruso</Link></li>
                <li><Link to="/tienda/Japonés">Japonés</Link></li>
                <li><Link to="/tienda/Francés">Francés</Link></li>
                <li><Link to="/tienda/Alemán">Alemán</Link></li>
                <li><Link to="/tienda/Portugués">Portugués</Link></li>
              </ul>
            )}
          </li>

          {/* Menú Sistemas Operativos */}
          <li 
            className='elemento-header' 
            onMouseEnter={() => setOsMenuVisible(true)} 
            onMouseLeave={() => setOsMenuVisible(false)}
          >
            <li>Sistemas Operativos</li>
            {osMenuVisible && (
              <ul className='submenu'>
                <li><Link to="/tienda/windows">Windows</Link></li>
                <li><Link to="/tienda/linux">Linux</Link></li>
                <li><Link to="/tienda/mac">Mac</Link></li>
              </ul>
            )}
          </li>

          {/* Menú Precio */}
          <li 
            className='elemento-header' 
            onMouseEnter={() => setPriceMenuVisible(true)} 
            onMouseLeave={() => setPriceMenuVisible(false)}
          >
           <li>Precio</li>
            {priceMenuVisible && (
              <div className='submenu price-menu'>
                <Slider
                  className="price-slider"
                  value={priceRange}
                  onChange={handlePriceChange}
                  min={0}
                  max={500}
                  step={1}
                  renderThumb={(props, state) => <div {...props} className="thumb">{state.valueNow}</div>}
                  renderTrack={(props, { index }) => <div {...props} className={`track ${index === 1 ? 'track-selected' : ''}`} />}
                />
                <div className="price-labels">
                  <span>{priceRange[0]} - </span>
                  <span>{ priceRange[1]}</span>
                </div>
                <Link to={`/tienda/${priceRange[0]}-${priceRange[1]}`} className="apply-price">Aplicar</Link>
                </div>
            )}
          </li>

          <li className='elemento-header'><Link to="/carrito">Carrito</Link></li>
          <li className='elemento-header'><Link to="/biblioteca">Biblioteca</Link></li>
          <li className='elemento-header'><Link to="/deseados">Deseados</Link></li>
          <li className='elemento-header'>
            <div className='usuario-header'>              
              <AccountCircleIcon/>
              <Link to="/account">Perfil</Link>
            </div>
          </li>
        </ul>
        <div className='box-input'>
          <input type="text" className='busqueda-header' placeholder="Buscar..." />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
