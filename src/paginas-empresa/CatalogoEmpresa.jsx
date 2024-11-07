import './CatalogoEmpresa.css';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { juegosEmpresa } from '../data/juegosEmpresa.js';
import { juegos } from '../data/juegos.js';
import BarraNavegacionEmpresa from '../componentes/BarraNavegacionEmpresa.jsx';
import {CardEmpresa} from '../componentes/CardEmpresa.jsx';

function CatalogoEmpresa() {
    const juegoFiltrado = juegosEmpresa.map(juegoEmpresa => 
        juegos.find(j => j.nombre === juegoEmpresa.nombre) 
    );
    
    return (    
        <>
        <BarraNavegacionEmpresa/>
        
        <div className='box-juegos'>
          <button className="card-agregar-juego">
            <AddIcon style={{fontSize: '100px'}}/>
          </button>

        
          {juegoFiltrado.map((juegos, index) => (
            <CardEmpresa key={index} imagen={juegos.imagenChica} nombre={juegos.nombre} precio={juegos.precio} />
          ))}
        </div>
        
        </>    
        
    );
}
export default CatalogoEmpresa;