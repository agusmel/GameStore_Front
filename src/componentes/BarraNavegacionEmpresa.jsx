import { Link } from 'react-router-dom'; 
import './BarraNavegacionEmpresa.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react';

function BarraNavegacionEmpresa() {


    return (
        <header>
            <nav className="navbar">
                <ul className='navbarList'>
                    <li className='elemento-header'><Link to="/catalogoEmpresa">Inicio</Link></li>
                    <li className='elemento-header'>
                    <div className='usuario-header'>              
                        <AccountCircleIcon/>
                        <Link to ="/perfilEmpresa"> Perfil</Link>
                    </div>
                    </li>
                </ul>
                <div className='box'>
                    <input type="text" className='busqueda-header' placeholder="Buscar..." />
                </div>
            </nav>
        </header>


    );
}

export default BarraNavegacionEmpresa;