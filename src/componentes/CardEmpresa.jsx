import React from 'react';
import { Link } from 'react-router-dom';
import './CardEmpresa.css';

// Catalogo
function CardEmpresa({ imagen, nombre, precio }) {
    return (
        <Link to={`/gameDetail/${nombre}`} className="card-box"> 
            <img className="game-image" src={imagen} alt={`Portada de ${nombre}`} /> 
            <h3 className="game-title">{nombre}</h3>
            <p className="game-price">${precio}</p>
        </Link>
    );
}

export  {CardEmpresa};
