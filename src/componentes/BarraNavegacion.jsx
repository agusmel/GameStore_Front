import { Link } from 'react-router-dom'; 
import './BarraNavegacion.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <ul className='navbar-list'>
          <li className='elemento-header'><Link to="/tienda">Tienda</Link></li>
          <li className='elemento-header'><Link to="/categorias">Categorias</Link></li>
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


